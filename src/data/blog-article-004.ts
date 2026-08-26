// Article content for Article #004: Human-in-the-Loop AI: Why Automation Should Not Mean No Review
// EN + ID versions, Mermaid diagrams included (rendered at build time).

export const ARTICLE_004_EN = `
# Human-in-the-Loop AI: Why Automation Should Not Mean No Review

AI automation is becoming increasingly good at producing useful output.

It can extract information, classify content, generate summaries, create structured data, and transform documents into knowledge.

But there is an important question that often gets skipped:

> **When should the AI be allowed to decide, and when should a human remain in control?**

For a prototype, it can be tempting to build:

\`\`\`text
Input
  ↓
AI
  ↓
Output
\`\`\`

For a business system, the workflow is usually more complicated:

\`\`\`text
Input
  ↓
AI Processing
  ↓
Draft
  ↓
Validation
  ↓
Human Review
  ↓
Approve / Reject
  ↓
Production
\`\`\`

This is the idea behind **human-in-the-loop AI**.

The goal is not to prevent automation.

The goal is to automate repetitive work while keeping human judgment at the points where it matters.

> **Automation should reduce repetitive work, not remove accountability.**

---

## The Problem With "Fully Automated" AI

The fact that an AI system can generate an output does not mean that output should immediately become production data.

Consider a document processing workflow.

An AI system may be able to generate:

\`\`\`text
Title
Category
Content
Metadata
\`\`\`

The output may look perfectly reasonable.

But a business system still needs to ask:

- Is the interpretation correct?
- Is important context missing?
- Is the category appropriate?
- Does the content accurately represent the source?
- Should this information be published?
- Who is responsible for approving it?

This creates an important distinction:

\`\`\`text
AI Can Generate
       ≠
AI Can Automatically Publish
\`\`\`

That distinction becomes especially important when AI output becomes part of a knowledge system.

The problem is not simply whether AI can produce something.

The problem is whether the system has enough control to trust that output in production.

---

## What Human-in-the-Loop Actually Means

Human-in-the-loop does not mean:

> "Let AI do everything, then make a person manually check everything."

That would simply move the bottleneck to the end of the process.

A better definition is:

> **Human-in-the-loop is a system design where human judgment remains at defined decision points inside an automated workflow.**

The human is not necessarily involved in every operation. Instead, the system deliberately identifies where human judgment adds value.

This is important because the objective is not maximum automation.

The objective is **appropriate automation**.

---

## Automation Is Not the Same as Autonomy

These concepts are often treated as interchangeable.

They are not.

### Automation

Automation means the system performs work that previously required manual effort.

For example:

\`\`\`text
PDF
 ↓
Extract
 ↓
Classify
 ↓
Generate Draft
\`\`\`

A human may still control the final decision.

### Autonomous Workflow

An autonomous workflow goes further:

\`\`\`text
PDF
 ↓
AI
 ↓
Decision
 ↓
Publish
\`\`\`

The system is now responsible for both processing and decision-making.

Neither approach is universally correct.

The appropriate level of autonomy depends on the consequences of getting a decision wrong.

A formatting task may tolerate complete automation.

A business knowledge item that employees rely on may require a stronger control layer.

This leads to a useful principle:

> **The higher the consequence of an incorrect decision, the more important explicit human control becomes.**

---

## Where Should Humans Stay in the Loop?

Not every AI task requires the same level of human involvement.

A useful way to think about the workflow is by separating **processing** from **judgment**.

### Tasks AI Can Often Handle

Examples include:

\`\`\`text
Extract
Normalize
Format
Generate drafts
Suggest categories
Suggest titles
Classify
Summarize
\`\`\`

These are often good candidates for automation.

### Tasks That May Need Human Review

Examples include:

\`\`\`text
Verify meaning
Correct interpretation
Approve content
Reject content
Decide publication
Confirm business relevance
\`\`\`

The important point is not that AI cannot perform these tasks.

It is that the business may not want the AI to have the final authority over them.

A practical division of responsibility looks like this:

| AI | Human |
|---|---|
| Process | Verify |
| Generate | Correct |
| Suggest | Decide |
| Classify | Approve |
| Transform | Reject |

---

## AI Output Should Be Treated as a Draft

One of the simplest ways to improve an AI workflow is to change how the system thinks about AI output.

Do not automatically treat:

\`\`\`text
AI Output
\`\`\`

as:

\`\`\`text
Final Truth
\`\`\`

Instead:

\`\`\`text
AI Output
     ↓
Draft
\`\`\`

The draft can then move through validation and review.

For example:

\`\`\`text
PDF
 ↓
AI Processing
 ↓
Draft Knowledge
 ↓
Review
 ↓
Published Knowledge
\`\`\`

This pattern is particularly useful for document-to-knowledge workflows.

The AI can perform the repetitive work of interpreting and structuring the document.

The human does not need to recreate the content manually.

The human only needs to decide whether the generated result is good enough to become production knowledge.

That is a much better use of human time.

---

## Validation Before Human Review

Human review is valuable, but that does not mean humans should be responsible for checking every technical property of an AI response.

Some checks can be automated first.

For example:

\`\`\`text
AI Output
    ↓
Schema Validation
    ↓
Required Fields?
Valid Category?
Content Present?
Expected Format?
    ↓
Human Review
\`\`\`

This creates two different types of validation.

### Machine Validation

The system can check structural requirements:

\`\`\`text
Is the required field present?
Is the format valid?
Is the category allowed?
Is the content empty?
Does the output match the expected schema?
\`\`\`

### Human Validation

The reviewer checks meaning and business context:

\`\`\`text
Does this actually represent the source?
Is the interpretation correct?
Was important context lost?
Is this appropriate to publish?
\`\`\`

These are different responsibilities.

A valid JSON object does not mean the information inside it is correct.

Likewise, a human should not have to spend time checking something the software can validate automatically.

A strong workflow therefore separates structural validation from human judgment.

---

## Designing the Review Workflow

A practical review workflow can be represented as:

\`\`\`mermaid
flowchart TD
    A[Document] --> B[AI Processing]
    B --> C[Draft Knowledge]
    C --> D[Machine Validation]
    D --> E[Human Review]
    E -->|Approve| F[Publish]
    E -->|Reject / Edit| C
\`\`\`

The important architectural decision is that **review is part of the workflow**, not something added manually after the AI feature has been built.

The application should understand that generated content has a lifecycle.

Conceptually, that lifecycle might look like:

\`\`\`text
draft
   ↓
pending_review
   ↓
approved
   ↓
published
\`\`\`

with possible rejection or editing paths.

The exact implementation depends on the application.

The principle is more important:

> **AI-generated content should have an explicit state between generation and publication.**

That makes the workflow easier to reason about, audit, and evolve.

---

## Human Review Is a Quality Gate

Human review should not be treated as evidence that automation has failed.

It should be treated as an **architectural quality gate**.

Software engineering already uses similar patterns:

\`\`\`text
Code
 ↓
Build
 ↓
Test
 ↓
Deploy
\`\`\`

The system does not assume that generated code should immediately go into production.

AI-generated knowledge can follow a similar principle:

\`\`\`text
Generate
 ↓
Validate
 ↓
Review
 ↓
Publish
\`\`\`

The purpose is not to make the process unnecessarily complicated.

The purpose is to create a controlled transition between:

> **machine-generated output**

and

> **production information.**

This distinction becomes increasingly important when AI output is consumed by other people, systems, or business workflows.

---

## A Real-World Knowledge Management Workflow

This pattern can be seen in the document-processing workflow of the VADS Knowledge Management System.

The system was built from scratch with Laravel and uses Meilisearch as its search layer. It supports multiple projects, with project-specific users and knowledge contexts.

One of its AI-assisted document workflows can be represented as:

\`\`\`text
PDF
 ↓
Read
 ↓
Understand Structure
 ↓
Generate Title / Category / Content
 ↓
Admin Review
 ↓
Publish
\`\`\`

The important architectural decision is not simply that AI processes the document.

It is that the AI-generated knowledge enters a review workflow before publication.

This gives the system a useful division of responsibility:

\`\`\`text
AI
 ↓
Interpret and Generate

Admin
 ↓
Review and Approve

System
 ↓
Publish and Make Available
\`\`\`

The project also integrates with MARS Outbound, QMS, and CRM. These integrations reinforce an important point: AI processing is one component inside a broader business application rather than the entire application itself.

The available project material does not establish particular AI models, accuracy metrics, or autonomous publishing behavior. Those should not be inferred from the workflow.

---

## What Should Be Automated and What Should Not?

A useful starting framework is:

| Activity | Automation | Human |
|---|---:|---:|
| Read document | High | Low |
| Extract information | High | Low |
| Generate draft | High | Review |
| Suggest category | High | Review |
| Validate schema | High | — |
| Check business meaning | — | High |
| Correct interpretation | — | High |
| Approve publication | — | High |

This is not a universal rule.

The right boundary depends on the application and the consequences of incorrect output.

The important principle is:

> **Automate the repetitive. Review the consequential.**

---

## Design for the Right Level of Automation

Human-in-the-loop does not mean that more human involvement is always better.

A poorly designed workflow can become:

\`\`\`text
AI
 ↓
Human checks everything
 ↓
Human rewrites everything
 ↓
Human publishes
\`\`\`

At that point, the AI may have reduced very little work.

The objective is to minimize unnecessary human involvement while preserving meaningful human control.

A good system should continually ask:

\`\`\`text
What can the machine reliably handle?
What actually requires human judgment?
\`\`\`

As a workflow becomes more mature, teams may find that some checks can be automated while others should remain human decisions.

The important thing is to use evidence from the actual workflow rather than assuming that maximum autonomy is always the goal.

> **Automation should increase when the system has earned the right to automate more.**

---

## Auditability Matters

Once AI participates in a production workflow, it becomes useful to know what happened to an output.

A mature system may need to answer questions such as:

\`\`\`text
What generated this content?
When was it generated?
Who reviewed it?
What was changed?
Who approved it?
When was it published?
\`\`\`

This is particularly relevant when knowledge becomes part of a business system.

The goal is not necessarily to build a massive audit framework for every AI feature.

It is to preserve enough traceability to understand how production information came into existence.

That makes troubleshooting and accountability much easier.

---

## Common Human-in-the-Loop Mistakes

### 1. Treating AI Output as Final Data

\`\`\`text
AI
 ↓
Database
\`\`\`

is not necessarily a production-ready architecture.

A better model for consequential knowledge is:

\`\`\`text
AI
 ↓
Draft
 ↓
Validation
 ↓
Review
 ↓
Production
\`\`\`

### 2. Adding Human Review Too Late

If review is introduced only after the AI feature is complete, the application may lack the states, permissions, and workflows needed to support it properly.

Review should be considered during architecture design.

### 3. Making Humans Validate Things Machines Can Validate

If software can check schema validity, required fields, or allowed categories, humans should not spend their time doing those checks manually.

Human attention is more valuable when applied to meaning and judgment.

### 4. Giving Humans No Clear Decision

A review screen should answer:

> **What exactly am I being asked to decide?**

Possible decisions might be:

\`\`\`text
Approve
Edit
Reject
\`\`\`

The workflow should make the responsibility explicit.

### 5. Treating Human Review as a Permanent Bottleneck

If every output requires extensive manual work, the team should investigate why.

Possible improvements include:

\`\`\`text
Better prompts
+
Better schemas
+
Machine validation
+
Better UI
+
Better source structure
\`\`\`

Human-in-the-loop should be a control mechanism, not an excuse for inefficient workflow design.

---

## How We Would Design It

For a business knowledge workflow, our preferred architecture follows a few principles:

1. **Automate repetitive work.**  
   Use AI where interpretation or transformation can save significant manual effort.

2. **Validate machine output.**  
   Do not use humans to perform checks that software can perform reliably.

3. **Keep humans at consequential decision points.**  
   Especially when incorrect output could become trusted business information.

4. **Make states explicit.**  
   The system should distinguish generated, reviewed, approved, and published content.

5. **Preserve traceability.**  
   When appropriate, retain enough information to understand how production content was generated and approved.

6. **Increase autonomy based on evidence.**  
   Start with controlled automation and expand it where the workflow demonstrates that additional autonomy is justified.

---

## Human-in-the-Loop Is a Product Decision Too

This architecture is not only an engineering concern.

It affects the user experience.

Consider two systems.

### System A

\`\`\`text
Upload PDF
      ↓
AI
      ↓
Done
\`\`\`

The user may not know whether the result was reviewed or how much control exists.

### System B

\`\`\`text
Upload PDF
      ↓
AI Processing
      ↓
Draft
      ↓
Review
      ↓
Approved
\`\`\`

The workflow makes the state of the information explicit.

This can be especially useful in internal knowledge systems where users need confidence that the information they are consuming has passed through an intentional process.

---

## Conclusion

Human-in-the-loop AI is not about putting a person between every input and every output.

It is about designing **where human judgment belongs**.

A production AI workflow can look like:

\`\`\`text
Input
 ↓
AI Processing
 ↓
Machine Validation
 ↓
Human Review
 ↓
Approval
 ↓
Production
\`\`\`

The AI handles repetitive processing and generates useful drafts.

Automated validation handles structural checks.

Humans remain responsible for decisions where context, business meaning, and accountability matter.

The important shift is from:

\`\`\`text
AI → Output
\`\`\`

to:

\`\`\`text
AI → Draft → Validate → Review → Production
\`\`\`

This is also the pattern behind the document-to-knowledge workflow discussed in our earlier work: AI helps read and structure complex documents, while Admin review remains the control point before publication.

The goal is not to keep humans doing what machines can already do.

The goal is to make sure humans remain responsible for the decisions machines should not make alone.

> **Automate the repetitive. Review the consequential.**

---
`;

export const ARTICLE_004_ID = `
# Human-in-the-Loop AI: Mengapa Otomasi Tidak Berarti Tanpa Review

AI automation semakin mampu menghasilkan output yang berguna.

AI dapat mengekstrak informasi, mengklasifikasikan konten, membuat ringkasan, menghasilkan data terstruktur, dan mengubah dokumen menjadi knowledge.

Namun ada satu pertanyaan penting yang sering dilewatkan:

> **Kapan AI boleh mengambil keputusan sendiri, dan kapan manusia harus tetap memegang kendali?**

Untuk sebuah prototype, kita mungkin tergoda membuat workflow seperti ini:

\`\`\`text
Input
  ↓
AI
  ↓
Output
\`\`\`

Untuk business system, workflow biasanya lebih kompleks:

\`\`\`text
Input
  ↓
AI Processing
  ↓
Draft
  ↓
Validation
  ↓
Human Review
  ↓
Approve / Reject
  ↓
Production
\`\`\`

Inilah konsep **human-in-the-loop AI**.

Tujuannya bukan menghambat automation.

Tujuannya adalah mengotomatisasi pekerjaan yang repetitif sambil mempertahankan human judgment pada titik-titik yang memang membutuhkan keputusan manusia.

> **Automation seharusnya mengurangi pekerjaan repetitif, bukan menghilangkan accountability.**

---

## Masalah dengan AI yang "Fully Automated"

Kemampuan AI menghasilkan sebuah output tidak otomatis berarti output tersebut boleh langsung menjadi production data.

Bayangkan sebuah workflow document processing.

AI mungkin dapat menghasilkan:

\`\`\`text
Title
Category
Content
Metadata
\`\`\`

Output tersebut bisa terlihat sangat masuk akal.

Tetapi business system tetap perlu menjawab beberapa pertanyaan:

- Apakah interpretasinya benar?
- Apakah ada konteks penting yang hilang?
- Apakah kategorinya tepat?
- Apakah content benar-benar merepresentasikan sumber?
- Apakah informasi ini sudah layak dipublikasikan?
- Siapa yang bertanggung jawab untuk menyetujuinya?

Di sinilah perbedaan penting muncul:

\`\`\`text
AI Can Generate
       ≠
AI Can Automatically Publish
\`\`\`

Perbedaan ini semakin penting ketika output AI menjadi bagian dari knowledge system.

Masalahnya bukan sekadar apakah AI mampu menghasilkan sesuatu.

Masalah sebenarnya adalah apakah system memiliki cukup control untuk mempercayai output tersebut di production.

---

## Apa Sebenarnya Human-in-the-Loop?

Human-in-the-loop bukan berarti:

> "Biarkan AI mengerjakan semuanya, lalu manusia memeriksa semuanya secara manual."

Pendekatan tersebut hanya memindahkan bottleneck ke bagian akhir workflow.

Definisi yang lebih tepat:

> **Human-in-the-loop adalah desain system di mana human judgment tetap berada pada decision point tertentu di dalam automated workflow.**

Manusia tidak harus terlibat dalam setiap operasi. System secara sengaja menentukan bagian mana yang membutuhkan human judgment.

Ini penting karena tujuan kita bukan membuat automation semaksimal mungkin.

Tujuannya adalah membuat **automation yang tepat**.

---

## Automation Tidak Sama dengan Autonomy

Dua konsep ini sering dianggap sama.

Padahal keduanya berbeda.

### Automation

Automation berarti system melakukan pekerjaan yang sebelumnya membutuhkan effort manual.

Contohnya:

\`\`\`text
PDF
 ↓
Extract
 ↓
Classify
 ↓
Generate Draft
\`\`\`

Manusia masih dapat mengendalikan keputusan akhirnya.

### Autonomous Workflow

Autonomous workflow melangkah lebih jauh:

\`\`\`text
PDF
 ↓
AI
 ↓
Decision
 ↓
Publish
\`\`\`

Sekarang system bertanggung jawab atas processing sekaligus decision-making.

Tidak ada satu pendekatan yang selalu benar.

Tingkat autonomy yang tepat bergantung pada konsekuensi jika sebuah keputusan ternyata salah.

Pekerjaan formatting mungkin aman untuk diotomatisasi sepenuhnya.

Sebaliknya, knowledge bisnis yang digunakan oleh banyak orang mungkin membutuhkan control layer yang lebih kuat.

Prinsip sederhananya:

> **Semakin besar konsekuensi dari sebuah keputusan yang salah, semakin penting explicit human control.**

---

## Di Mana Manusia Perlu Tetap Berada dalam Loop?

Tidak semua pekerjaan AI membutuhkan tingkat human involvement yang sama.

Cara yang berguna untuk melihat workflow adalah dengan memisahkan **processing** dari **judgment**.

### Pekerjaan yang Sering Cocok untuk AI

Contohnya:

\`\`\`text
Extract
Normalize
Format
Generate drafts
Suggest categories
Suggest titles
Classify
Summarize
\`\`\`

Pekerjaan seperti ini umumnya merupakan kandidat yang baik untuk automation.

### Pekerjaan yang Dapat Membutuhkan Human Review

Contohnya:

\`\`\`text
Verify meaning
Correct interpretation
Approve content
Reject content
Decide publication
Confirm business relevance
\`\`\`

Poin pentingnya bukan bahwa AI tidak mampu melakukan pekerjaan tersebut.

Masalahnya adalah business mungkin tidak ingin memberikan final authority atas keputusan tersebut kepada AI.

Pembagian tanggung jawab secara sederhana:

| AI | Human |
|---|---|
| Process | Verify |
| Generate | Correct |
| Suggest | Decide |
| Classify | Approve |
| Transform | Reject |

---

## Output AI Sebaiknya Dianggap sebagai Draft

Salah satu cara paling sederhana untuk memperbaiki AI workflow adalah mengubah cara kita memperlakukan output AI.

Jangan otomatis menganggap:

\`\`\`text
AI Output
\`\`\`

sebagai:

\`\`\`text
Final Truth
\`\`\`

Lebih baik perlakukan sebagai:

\`\`\`text
AI Output
     ↓
Draft
\`\`\`

Draft tersebut kemudian dapat melewati validation dan review.

Misalnya:

\`\`\`text
PDF
 ↓
AI Processing
 ↓
Draft Knowledge
 ↓
Review
 ↓
Published Knowledge
\`\`\`

Pola ini sangat berguna untuk document-to-knowledge workflow.

AI dapat menangani pekerjaan repetitif untuk memahami dan menyusun struktur dokumen.

Manusia tidak perlu membuat ulang content tersebut dari awal.

Manusia cukup menentukan apakah hasil yang dibuat AI sudah cukup baik untuk menjadi production knowledge.

Itulah penggunaan human time yang jauh lebih efektif.

---

## Validation Sebelum Human Review

Human review penting, tetapi bukan berarti manusia harus memeriksa setiap aspek teknis dari output AI.

Sebagian pemeriksaan dapat dilakukan secara otomatis terlebih dahulu.

Contohnya:

\`\`\`text
AI Output
    ↓
Schema Validation
    ↓
Required Fields?
Valid Category?
Content Present?
Expected Format?
    ↓
Human Review
\`\`\`

Di sini terdapat dua jenis validation yang berbeda.

### Machine Validation

System dapat memeriksa requirement yang bersifat struktural:

\`\`\`text
Apakah required field tersedia?
Apakah formatnya valid?
Apakah category diperbolehkan?
Apakah content kosong?
Apakah output sesuai dengan expected schema?
\`\`\`

### Human Validation

Reviewer memeriksa makna dan business context:

\`\`\`text
Apakah output benar-benar merepresentasikan sumber?
Apakah interpretasinya tepat?
Apakah ada konteks penting yang hilang?
Apakah content ini layak dipublikasikan?
\`\`\`

Keduanya memiliki tanggung jawab yang berbeda.

JSON yang valid tidak berarti informasi di dalamnya benar.

Sebaliknya, manusia tidak seharusnya menghabiskan waktu untuk memeriksa sesuatu yang dapat divalidasi oleh software secara reliable.

Workflow yang baik memisahkan structural validation dari human judgment.

---

## Mendesain Review Workflow

Workflow review yang praktis dapat digambarkan seperti ini:

\`\`\`mermaid
flowchart TD
    A[Document] --> B[AI Processing]
    B --> C[Draft Knowledge]
    C --> D[Machine Validation]
    D --> E[Human Review]
    E -->|Approve| F[Publish]
    E -->|Reject / Edit| C
\`\`\`

Keputusan architectural yang penting di sini adalah bahwa **review merupakan bagian dari workflow**, bukan sesuatu yang baru ditambahkan setelah AI feature selesai dibuat.

Application perlu memahami bahwa generated content memiliki lifecycle.

Secara konseptual, lifecycle tersebut dapat berupa:

\`\`\`text
draft
   ↓
pending_review
   ↓
approved
   ↓
published
\`\`\`

dengan kemungkinan adanya jalur rejection atau editing.

Implementasi detailnya bergantung pada application.

Prinsipnya lebih penting:

> **AI-generated content sebaiknya memiliki state yang jelas antara generation dan publication.**

Dengan begitu workflow lebih mudah dipahami, diaudit, dan dikembangkan.

---

## Human Review adalah Quality Gate

Human review tidak seharusnya dianggap sebagai bukti bahwa automation gagal.

Human review sebaiknya dipandang sebagai **architectural quality gate**.

Software engineering sudah lama menggunakan pola yang serupa:

\`\`\`text
Code
 ↓
Build
 ↓
Test
 ↓
Deploy
\`\`\`

System tidak mengasumsikan bahwa code yang sudah dibuat otomatis boleh langsung masuk production.

AI-generated knowledge dapat menggunakan prinsip yang serupa:

\`\`\`text
Generate
 ↓
Validate
 ↓
Review
 ↓
Publish
\`\`\`

Tujuannya bukan membuat proses menjadi lebih rumit dari yang diperlukan.

Tujuannya adalah menciptakan transisi yang terkontrol antara:

> **machine-generated output**

dan

> **production information.**

Perbedaan ini menjadi semakin penting ketika output AI digunakan oleh orang lain, system lain, atau business workflow.

---

## Contoh Nyata: Workflow Knowledge Management

Pola ini dapat dilihat pada document-processing workflow di VADS Knowledge Management System.

System tersebut dibangun dari awal menggunakan Laravel dan menggunakan Meilisearch sebagai search layer. VADS mendukung beberapa project dengan user dan knowledge context yang spesifik untuk masing-masing project.

Salah satu workflow document processing yang menggunakan AI dapat direpresentasikan sebagai:

\`\`\`text
PDF
 ↓
Read
 ↓
Understand Structure
 ↓
Generate Title / Category / Content
 ↓
Admin Review
 ↓
Publish
\`\`\`

Keputusan architectural yang penting bukan hanya bahwa AI memproses dokumen.

Yang penting adalah knowledge yang dihasilkan AI masuk ke review workflow sebelum publication.

Pembagian tanggung jawabnya dapat dilihat secara sederhana:

\`\`\`text
AI
 ↓
Interpret and Generate

Admin
 ↓
Review and Approve

System
 ↓
Publish and Make Available
\`\`\`

Project tersebut juga terintegrasi dengan MARS Outbound, QMS, dan CRM. Hal ini memperlihatkan bahwa AI processing merupakan salah satu component di dalam business application yang lebih besar, bukan keseluruhan application.

Project material yang tersedia tidak menetapkan model AI tertentu, accuracy metric, atau autonomous publishing behavior. Karena itu, hal-hal tersebut tidak seharusnya diasumsikan dari workflow yang ada.

---

## Apa yang Sebaiknya Diotomatisasi dan Apa yang Tidak?

Sebagai starting point, kita dapat menggunakan framework berikut:

| Activity | Automation | Human |
|---|---:|---:|
| Read document | High | Low |
| Extract information | High | Low |
| Generate draft | High | Review |
| Suggest category | High | Review |
| Validate schema | High | — |
| Check business meaning | — | High |
| Correct interpretation | — | High |
| Approve publication | — | High |

Ini bukan aturan universal.

Batas yang tepat bergantung pada application dan konsekuensi dari incorrect output.

Prinsip utamanya:

> **Automate the repetitive. Review the consequential.**

---

## Mendesain Tingkat Automation yang Tepat

Human-in-the-loop tidak berarti semakin banyak human involvement selalu semakin baik.

Workflow yang buruk dapat berubah menjadi:

\`\`\`text
AI
 ↓
Human checks everything
 ↓
Human rewrites everything
 ↓
Human publishes
\`\`\`

Pada titik tersebut, AI mungkin hanya mengurangi sedikit pekerjaan.

Tujuannya adalah meminimalkan human involvement yang tidak diperlukan sambil mempertahankan human control yang memang penting.

System sebaiknya terus mengevaluasi dua pertanyaan:

\`\`\`text
Apa yang dapat ditangani machine dengan reliable?
Apa yang benar-benar membutuhkan human judgment?
\`\`\`

Seiring workflow menjadi lebih matang, sebagian pemeriksaan mungkin dapat diotomatisasi sementara keputusan lainnya tetap menjadi tanggung jawab manusia.

Yang penting adalah menggunakan evidence dari workflow yang sebenarnya, bukan berasumsi bahwa maximum autonomy selalu merupakan tujuan.

> **Automation sebaiknya meningkat ketika system sudah memiliki cukup evidence bahwa automation tambahan memang aman dan bernilai.**

---

## Auditability Tetap Penting

Ketika AI mulai berpartisipasi dalam production workflow, penting untuk dapat memahami apa yang terjadi pada sebuah output.

System yang lebih matang mungkin perlu menjawab pertanyaan seperti:

\`\`\`text
Apa yang menghasilkan content ini?
Kapan content dibuat?
Siapa yang melakukan review?
Apa yang diubah?
Siapa yang menyetujui?
Kapan content dipublikasikan?
\`\`\`

Hal ini menjadi semakin relevan ketika knowledge menjadi bagian dari business system.

Tujuannya bukan selalu membuat audit framework yang besar untuk setiap AI feature.

Tujuannya adalah menyimpan traceability yang cukup untuk memahami bagaimana production information tersebut terbentuk.

Dengan begitu troubleshooting dan accountability menjadi lebih mudah.

---

## Kesalahan Umum dalam Human-in-the-Loop

### 1. Menganggap Output AI sebagai Final Data

\`\`\`text
AI
 ↓
Database
\`\`\`

belum tentu merupakan production architecture yang baik.

Untuk knowledge yang consequential, model yang lebih aman adalah:

\`\`\`text
AI
 ↓
Draft
 ↓
Validation
 ↓
Review
 ↓
Production
\`\`\`

### 2. Menambahkan Human Review Terlambat

Jika review baru dipikirkan setelah AI feature selesai dibuat, application mungkin tidak memiliki state, permission, dan workflow yang dibutuhkan.

Review sebaiknya dipertimbangkan sejak architecture design.

### 3. Membuat Manusia Memvalidasi Hal yang Bisa Divalidasi Machine

Jika software dapat memeriksa schema validity, required fields, atau allowed categories, manusia sebaiknya tidak menghabiskan waktu untuk melakukan pemeriksaan tersebut.

Human attention lebih bernilai ketika digunakan untuk meaning dan judgment.

### 4. Tidak Memberikan Decision yang Jelas kepada Reviewer

Review screen seharusnya menjawab:

> **Apa sebenarnya yang harus saya putuskan?**

Contoh decision:

\`\`\`text
Approve
Edit
Reject
\`\`\`

Workflow harus membuat responsibility tersebut jelas.

### 5. Menjadikan Human Review sebagai Permanent Bottleneck

Jika setiap output membutuhkan pekerjaan manual yang terlalu banyak, team perlu mencari penyebabnya.

Beberapa area yang dapat diperbaiki:

\`\`\`text
Better prompts
+
Better schemas
+
Machine validation
+
Better UI
+
Better source structure
\`\`\`

Human-in-the-loop seharusnya menjadi control mechanism, bukan alasan untuk mempertahankan workflow yang tidak efisien.

---

## Bagaimana Kami Akan Mendesainnya

Untuk business knowledge workflow, kami lebih memilih architecture dengan beberapa prinsip berikut:

1. **Automate pekerjaan repetitif.**  
   Gunakan AI ketika interpretation atau transformation dapat mengurangi effort manual secara signifikan.

2. **Validasi output machine.**  
   Jangan menggunakan manusia untuk melakukan pemeriksaan yang dapat dilakukan software secara reliable.

3. **Pertahankan manusia pada decision point yang consequential.**  
   Terutama ketika incorrect output dapat berubah menjadi trusted business information.

4. **Buat state menjadi explicit.**  
   System harus dapat membedakan generated, reviewed, approved, dan published content.

5. **Pertahankan traceability.**  
   Jika relevan, simpan informasi yang cukup untuk memahami bagaimana production content dibuat dan disetujui.

6. **Tingkatkan autonomy berdasarkan evidence.**  
   Mulai dari controlled automation dan tingkatkan autonomy ketika workflow menunjukkan bahwa automation tambahan memang layak.

---

## Human-in-the-Loop Juga Merupakan Product Decision

Architecture ini bukan hanya persoalan engineering.

Ia juga memengaruhi user experience.

Bandingkan dua system berikut.

### System A

\`\`\`text
Upload PDF
      ↓
AI
      ↓
Done
\`\`\`

User mungkin tidak mengetahui apakah hasil tersebut sudah direview atau seberapa besar control yang tersedia.

### System B

\`\`\`text
Upload PDF
      ↓
AI Processing
      ↓
Draft
      ↓
Review
      ↓
Approved
\`\`\`

Workflow membuat state informasi menjadi lebih jelas.

Hal ini sangat berguna pada internal knowledge system ketika user membutuhkan keyakinan bahwa informasi yang mereka gunakan telah melewati proses yang memang disengaja.

---

## Conclusion

Human-in-the-loop AI bukan berarti menempatkan manusia di antara setiap input dan setiap output.

Konsepnya adalah menentukan **di mana human judgment memang diperlukan**.

Production AI workflow dapat terlihat seperti:

\`\`\`text
Input
 ↓
AI Processing
 ↓
Machine Validation
 ↓
Human Review
 ↓
Approval
 ↓
Production
\`\`\`

AI menangani processing yang repetitif dan menghasilkan draft yang berguna.

Automated validation menangani structural checks.

Manusia tetap bertanggung jawab atas keputusan yang membutuhkan context, business meaning, dan accountability.

Perubahan pentingnya adalah dari:

\`\`\`text
AI → Output
\`\`\`

menjadi:

\`\`\`text
AI → Draft → Validate → Review → Production
\`\`\`

Pola ini juga terlihat dalam document-to-knowledge workflow yang telah kita bahas sebelumnya: AI membantu membaca dan menyusun dokumen kompleks, sementara Admin review tetap menjadi control point sebelum publication.

Tujuannya bukan mempertahankan manusia untuk mengerjakan sesuatu yang sudah dapat dilakukan machine.

Tujuannya adalah memastikan manusia tetap bertanggung jawab atas keputusan yang tidak seharusnya dibuat machine sendirian.

> **Automate the repetitive. Review the consequential.**

---
`;
