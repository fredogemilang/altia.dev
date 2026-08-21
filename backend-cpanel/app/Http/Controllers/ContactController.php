<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Handle incoming contact form submission and deliver via Brevo API
     */
    public function send(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|max:150',
            'service' => 'required|string|min:2|max:100',
            'budget' => 'nullable|string|max:50',
            'message' => 'required|string|min:10|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'details' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();
        $name = $validated['name'];
        $email = $validated['email'];
        $service = $validated['service'];
        $budget = $validated['budget'] ?? 'Not specified';
        $message = $validated['message'];

        $apiKey = env('BREVO_API_KEY');
        $senderEmail = env('BREVO_SENDER_EMAIL', 'hello@altiadev.com');
        $senderName = env('BREVO_SENDER_NAME', 'ALTIA DEV Website');
        $receiverEmail = env('CONTACT_RECEIVER_EMAIL', 'hello@altiadev.com');

        // Development mock mode if no API key configured
        if (!$apiKey || $apiKey === 'your_brevo_api_key_here') {
            Log::info('[ALTIA DEV Contact Form Submission (Mock mode)]', [
                'name' => $name,
                'email' => $email,
                'service' => $service,
                'budget' => $budget,
                'message' => $message,
                'timestamp' => now()->toIso8601String(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Message received successfully (development mock mode).',
            ]);
        }

        // Send Transactional Email via Brevo API
        try {
            $htmlContent = '
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E8DFD3; border-radius: 12px; background-color: #FFF6E8; color: #2F2A26;">
                <h2 style="color: #E34234; margin-top: 0;">New Project Brief Received</h2>
                <p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>
                <p><strong>Email:</strong> <a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></p>
                <p><strong>Service of Interest:</strong> ' . htmlspecialchars($service) . '</p>
                <p><strong>Estimated Budget:</strong> ' . htmlspecialchars($budget) . '</p>
                <div style="margin-top: 20px; padding: 15px; background: #FAF4E9; border-radius: 8px; border-left: 4px solid #E34234;">
                    <p style="margin: 0; font-weight: bold; margin-bottom: 8px;">Project Details & Message:</p>
                    <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">' . nl2br(htmlspecialchars($message)) . '</p>
                </div>
                <p style="font-size: 12px; color: #8A8078; margin-top: 30px; border-top: 1px solid #E8DFD3; padding-top: 10px;">
                    Sent from ALTIA DEV Contact Form (' . now()->toDayDateTimeString() . ')
                </p>
            </div>';

            $response = Http::withHeaders([
                'api-key' => $apiKey,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ])->post('https://api.brevo.com/v3/smtp/email', [
                'sender' => [
                    'name' => $senderName,
                    'email' => $senderEmail,
                ],
                'to' => [
                    [
                        'email' => $receiverEmail,
                        'name' => 'ALTIA DEV Inquiries',
                    ],
                ],
                'replyTo' => [
                    'email' => $email,
                    'name' => $name,
                ],
                'subject' => "[New Inquiry] {$name}: {$service}",
                'htmlContent' => $htmlContent,
            ]);

            if (!$response->successful()) {
                Log::error('[Brevo API Error]', ['response' => $response->body()]);
                return response()->json([
                    'success' => false,
                    'error' => 'Failed to send email through Brevo API',
                ], 502);
            }

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent successfully to ALTIA DEV.',
            ]);
        } catch (\Exception $e) {
            Log::error('[Contact API Internal Error]', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'error' => 'Internal server error occurred.',
            ], 500);
        }
    }
}
