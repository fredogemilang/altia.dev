<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class EstimatorController extends Controller
{
    /**
     * Calculate project estimate from answers
     */
    public function estimate(Request $request): JsonResponse
    {
        $answers = $request->input('answers');
        if (!is_array($answers)) {
            return response()->json([
                'success' => false,
                'error' => 'Missing or invalid answers payload',
            ], 400);
        }

        $requirements = $this->normalizeAnswers($answers);
        $estimate = $this->calculateEstimate($requirements);

        return response()->json([
            'success' => true,
            'requirements' => $requirements,
            'estimate' => $estimate,
        ]);
    }

    /**
     * Capture lead, calculate score, and persist
     */
    public function lead(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'contact.name' => 'required|string|min:2|max:100',
            'contact.email' => 'required|email|max:150',
            'contact.phone' => 'required|string|min:6|max:30',
            'contact.company' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Full name, work email, and WhatsApp / phone number are required.',
                'details' => $validator->errors(),
            ], 422);
        }

        $contact = $request->input('contact');
        $answers = $request->input('answers', []);
        $locale = $request->input('locale', 'en');

        $requirements = $this->normalizeAnswers($answers);
        $estimate = $this->calculateEstimate($requirements);
        $qualification = $this->scoreLead($contact, $requirements, $estimate);

        $lead = [
            'id' => 'lead_' . time() . '_' . Str::random(5),
            'contact' => [
                'name' => trim($contact['name']),
                'email' => trim($contact['email']),
                'company' => trim($contact['company'] ?? ''),
                'phone' => trim($contact['phone']),
            ],
            'project' => [
                'requirements' => $requirements,
                'estimate' => $estimate,
            ],
            'qualification' => $qualification,
            'source' => [
                'locale' => $locale,
                'referrer' => $request->header('referer'),
                'userAgent' => $request->header('user-agent'),
            ],
            'status' => 'new',
            'createdAt' => now()->toIso8601String(),
        ];

        Log::info('[Lead Captured & Scored]:', $lead);

        return response()->json([
            'success' => true,
            'leadId' => $lead['id'],
            'requirements' => $requirements,
            'estimate' => $estimate,
            'qualification' => $qualification,
        ]);
    }

    /**
     * Normalize wizard answers
     */
    private function normalizeAnswers(array $answers): array
    {
        $service = $answers['service'] ?? 'web';
        $scope = $answers['scope'] ?? 'custom';
        $timeline = $answers['timeline'] ?? 'standard';
        $complexity = $answers['complexity'] ?? 'medium';
        $features = is_array($answers['features'] ?? null) ? $answers['features'] : [];

        return [
            'service' => $service,
            'scope' => $scope,
            'timeline' => $timeline,
            'complexity' => $complexity,
            'features' => $features,
            'rawAnswers' => $answers,
        ];
    }

    /**
     * Calculate cost and timeline estimates
     */
    private function calculateEstimate(array $req): array
    {
        $basePriceMap = [
            'web' => 3500,
            'app' => 5000,
            'ai' => 6000,
        ];

        $scopeMultiplierMap = [
            'landing' => 0.6,
            'mvp' => 1.0,
            'custom' => 1.4,
            'enterprise' => 2.2,
        ];

        $base = $basePriceMap[$req['service']] ?? 4000;
        $scopeMul = $scopeMultiplierMap[$req['scope']] ?? 1.0;

        $featureCost = count($req['features']) * 500;
        $subtotal = ($base * $scopeMul) + $featureCost;

        $minPrice = (int) round($subtotal * 0.85);
        $maxPrice = (int) round($subtotal * 1.25);

        $weeksMap = [
            'landing' => '2 - 3 weeks',
            'mvp' => '4 - 6 weeks',
            'custom' => '6 - 10 weeks',
            'enterprise' => '10 - 16 weeks',
        ];

        $estimatedWeeks = $weeksMap[$req['scope']] ?? '4 - 8 weeks';

        return [
            'minPrice' => $minPrice,
            'maxPrice' => $maxPrice,
            'currency' => 'USD',
            'estimatedWeeks' => $estimatedWeeks,
            'confidence' => 'high',
        ];
    }

    /**
     * Score lead qualification
     */
    private function scoreLead(array $contact, array $requirements, array $estimate): array
    {
        $score = 50;

        if (!empty($contact['company'])) $score += 15;
        if ($estimate['maxPrice'] >= 8000) $score += 20;
        if (!empty($contact['phone'])) $score += 15;

        $tier = $score >= 80 ? 'hot' : ($score >= 60 ? 'warm' : 'qualified');

        return [
            'score' => min(100, $score),
            'tier' => $tier,
            'recommendedAction' => $tier === 'hot' ? 'Priority 30-min discovery call' : 'Standard email follow-up',
        ];
    }
}
