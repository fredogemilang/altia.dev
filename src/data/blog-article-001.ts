// Article content for Article #001: How to Turn Complex PDFs into Structured Knowledge
// Faithfully extracted from docs/blog/articles/001_Complex_PDFs_to_Structured_Knowledge.md
// and docs/blog/articles/001_Complex_PDFs_to_Structured_Knowledge_ID.md (Poin 03. Artikel)
// Formatted with Mermaid diagrams and typography-ready headings.

export const ARTICLE_001_EN = `
# How to Turn Complex PDFs into Structured Knowledge

Businesses accumulate knowledge in documents long before they build systems around it.

Policies, manuals, procedures, reports, training materials, product documents, operational guides, and internal references often arrive as PDFs. The information is there, but it is not necessarily easy to search, organize, update, or reuse.

That creates a common problem:

> **The business has the knowledge, but the knowledge is trapped inside documents.**

A simple PDF text extractor can recover words from those files. But that is only the beginning.

To make documents genuinely useful inside a knowledge system, the system needs to understand more than text. It needs to identify structure, turn that structure into meaningful content, classify it, and provide a workflow for people to review what the system produced.

This is where AI-assisted document processing becomes interesting.

---

## Why PDFs Are Harder Than They Look

A PDF may look like a simple document to a human reader.

For software, it can be considerably more complicated.

A document can contain:

- headings
- paragraphs
- tables
- lists
- page breaks
- repeated headers and footers
- sections
- captions
- references
- different document hierarchies

Even when text can be extracted successfully, the resulting text may not preserve the meaning of the original structure.

For example, a system might extract:

\`\`\`text
Customer Eligibility

The following customers are eligible...

1. Existing customers
2. New customers
3. Corporate customers

Required Documents

...
\`\`\`

But a knowledge system does not necessarily want one large block of text.

It may need something closer to:

\`\`\`text
Title:
Customer Eligibility

Category:
Customer Policy

Content:
...

Related Topic:
Required Documents
\`\`\`

The difference is important.

The first output is **extracted text**.

The second is **structured knowledge**.

---

## Text Extraction Is Only the First Step

One of the easiest mistakes is to treat PDF processing as a text extraction problem.

A simplified pipeline might look like:

\`\`\`mermaid
flowchart TD
    A["PDF Document"] --> B["Text Extraction"]
    B --> C["Database"]
\`\`\`

That can work for some use cases.

But if the objective is to build a useful knowledge system, the pipeline often needs another layer:

\`\`\`mermaid
flowchart TD
    A["PDF Document"] --> B["Document Understanding"]
    B --> C["Structure Recognition"]
    C --> D["Content Generation"]
    D --> E["Classification"]
    E --> F["Human Review"]
    F --> G["Structured Knowledge"]
    G --> H["Search & Retrieval"]
\`\`\`

The important shift is from:

> "Can we extract the text?"

to:

> **"Can we understand enough of the document to turn it into something useful?"**

---

## What "Structured Knowledge" Actually Means

Structured knowledge does not necessarily mean putting every sentence into a rigid database schema.

It means giving information enough structure that the rest of the system can work with it.

For example, a knowledge item may have:

\`\`\`text
Title
Category
Content
Source Document
Related Project
Metadata
Publication Status
\`\`\`

The exact schema depends on the business.

The important part is that the system creates a consistent unit of knowledge.

This makes downstream workflows easier:

\`\`\`mermaid
flowchart LR
    A["Document"] --> B["Knowledge Items"]
    B --> C["Search Layer"]
    C --> D["Admin Review"]
    D --> E["Publication"]
    E --> F["User Access"]
\`\`\`

Instead of treating a PDF as a single opaque object, the system can treat its useful information as a collection of searchable knowledge items.

---

## A Practical PDF-to-Knowledge Pipeline

A useful starting architecture is a four-stage workflow:

\`\`\`mermaid
flowchart TD
    A["PDF Input"] --> B["1. Read Document"]
    B --> C["2. Understand Structure"]
    C --> D["3. Generate Structured Content"]
    D --> E["4. Human Review"]
    E --> F["Published Knowledge Base"]
\`\`\`

Each stage has a different responsibility.

### 1. Read the Document

The first step is to make the document accessible to the processing system.

The system needs to ingest the PDF and extract the information required for further processing.

At this stage, the goal is not to produce the final knowledge item.

It is simply:

> **Get the document into a form the processing pipeline can understand.**

This distinction helps keep the architecture modular.

### 2. Understand Its Structure

Once the document is readable, the next problem is understanding its organization.

The system needs to determine things such as:

- where sections begin and end
- which text is a heading
- which content belongs to a section
- which information should become a category
- which parts belong together

This is where AI-assisted processing can add significant value.

Instead of relying entirely on fixed rules, an AI model can help interpret the semantic structure of the document.

The objective is not simply:

\`\`\`text
Extract everything
\`\`\`

but:

\`\`\`text
Understand what the extracted information represents
\`\`\`

### 3. Generate Structured Content

After the document structure has been interpreted, the system can generate the fields needed by the knowledge platform.

For example:

\`\`\`mermaid
flowchart TD
    A["PDF Ingestion"] --> B["Document Understanding"]
    B --> C["Title"]
    B --> D["Category"]
    B --> E["Content Block"]
    B --> F["Metadata"]
\`\`\`

The AI may be responsible for proposing:

- a useful title
- an appropriate category
- structured content
- normalized formatting

The important word here is **proposing**.

The AI output should not automatically become the final published knowledge.

AI produces drafts that enter the downstream editorial workflow.

### 4. Review Before Publishing

This is one of the most important parts of the workflow.

The generated content should pass through an administrative review step.

\`\`\`mermaid
flowchart LR
    A["AI Processing"] --> B["Draft Knowledge"]
    B --> C["Admin Review"]
    C --> D{"Approve / Edit / Reject"}
    D -->|Approved| E["Published Knowledge"]
    D -->|Rejected| F["Revise / Discard"]
\`\`\`

This creates a **human-in-the-loop** system.

The goal is not to make AI slower. The goal is to give automation a controlled boundary.

For business knowledge, an incorrect generated article can be worse than an unprocessed document because users may trust information that appears to have already been structured and approved.

Human review provides a vital quality gate.

---

## Where AI Helps

AI is particularly useful when the transformation requires interpretation rather than simple extraction.

For example, the system can help with:

\`\`\`mermaid
flowchart TD
    A["Document Section"] --> B["'What is this section about?'"]
    B --> C["Clear Title"]
    C --> D["'What category does it belong to?'"]
    D --> E["Taxonomy Category"]
    E --> F["'What information should become the knowledge content?'"]
    F --> G["Structured Content"]
\`\`\`

This is different from asking an AI model to simply summarize every PDF.

The objective is to produce output that fits the destination knowledge system.

That means the AI should operate within a defined schema and workflow.

---

## Why Human Review Still Matters

Automation does not remove the need for judgment.

It changes where judgment happens.

A useful model is:

\`\`\`text
Machine:
- Process
- Interpret
- Draft
- Classify

Human:
- Review
- Correct
- Approve
- Publish
\`\`\`

This is especially useful when documents contain information that affects business operations.

The human reviewer can identify:

- incorrect interpretation
- missing context
- inappropriate categorization
- misleading titles
- content that should not be published

The system therefore becomes neither fully manual nor blindly automated.

It becomes:

> **AI-assisted knowledge production with human control.**

---

## Designing the Knowledge Layer

Document processing is only one part of the overall system.

The generated knowledge needs somewhere to live.

A basic conceptual architecture looks like:

\`\`\`mermaid
flowchart TD
    A["PDF Documents"] --> B["Document Processing Pipeline"]
    B --> C["Structured Knowledge"]
    C --> D["Database"]
    C --> E["Search Engine"]
    D --> F["Knowledge UI"]
    E --> F
    F --> G["End Users"]
\`\`\`

For larger systems, access control and project boundaries also become important.

A knowledge system may not contain one universal pool of information.

Different projects may have different:

- users
- knowledge collections
- permissions
- content contexts

That means the architecture needs to model those boundaries explicitly.

---

## Search Is Part of the Problem

Structured knowledge is only useful if people can find it.

This is where document processing connects directly to search.

A simplified relationship is:

\`\`\`mermaid
flowchart TD
    A["Better Document Understanding"] --> B["Better Structured Knowledge"]
    B --> C["Better Searchable Content"]
    C --> D["Better Knowledge Retrieval"]
\`\`\`

Search also influences how the content should be structured in the first place.

If the final knowledge items have useful titles, categories, and content boundaries, the search layer has more meaningful information to work with.

This is why document processing and search should not be treated as completely separate problems.

They are parts of the same knowledge workflow.

---

## A Real-World Example

A useful example comes from an enterprise knowledge management system we built for a client environment.

The system was designed as a multi-project knowledge platform.

Conceptually:

\`\`\`mermaid
flowchart TD
    Org["Organization"] --> ProjA["Project A"]
    Org --> ProjB["Project B"]
    ProjA --> UsersA["Users & Permissions"]
    ProjA --> KnowA["Knowledge Base A"]
    ProjB --> UsersB["Users & Permissions"]
    ProjB --> KnowB["Knowledge Base B"]
\`\`\`

The platform was built from scratch using **Laravel**, with **Meilisearch** providing the search layer.

One of the more specialized workflows was **AI-assisted document processing**:

\`\`\`mermaid
flowchart LR
    PDF["PDF"] --> Read["Read"]
    Read --> Struct["Understand Structure"]
    Struct --> Gen["Generate Title / Category / Content"]
    Gen --> Review["Admin Review"]
    Review --> Pub["Publish to KMS"]
\`\`\`

The system also features live integrations with **MARS Outbound, QMS, and CRM**.

The important lesson from this type of system is that the AI component is not the entire product.

The actual product is the workflow around the AI.

The complete system is:

\`\`\`text
Document
+
AI Processing
+
Structured Data
+
Search
+
Permissions
+
Review
+
Business Integrations
\`\`\`

That combination is what turns an AI capability into a dependable business application.

---

## Common Mistakes

### 1. Treating Every PDF as Plain Text

Text extraction can lose the relationships between sections and their meaning. If the destination is a knowledge system, structure matters.

### 2. Sending the Entire Document to an AI Model and Publishing the Result

This can produce a readable output, but readability is not the same as reliable business knowledge. The system needs a defined output structure, validation, review, and publishing controls.

### 3. Starting with the AI Model Instead of the Workflow

It is tempting to start with *"Which AI model should we use?"*. A better starting question is:

> **"What should happen to a document from upload to published knowledge?"**

The model is one component of that workflow.

### 4. Ignoring the Destination Schema

If the knowledge platform expects \`Title\`, \`Category\`, and \`Content\`, the processing pipeline should be designed around those outputs. AI should not generate a generic summary and leave another manual process to transform it later.

### 5. Forgetting Human Review

Automation should reduce repetitive work. It should not automatically remove accountability. For many business workflows, the right architecture is:

\`\`\`text
AI → Review → Publish
\`\`\`

rather than:

\`\`\`text
AI → Publish
\`\`\`

### 6. Treating Search as an Afterthought

If the final goal is knowledge retrieval, search should influence the information architecture from the beginning. The document pipeline and search layer should be designed together.

---

## What We Would Recommend

If a business is considering turning a large document collection into a searchable knowledge system, start with the workflow rather than the AI model.

Define:

1. What documents enter the system?
2. What information needs to be extracted?
3. What structure should the knowledge have?
4. Who reviews the generated content?
5. Who can publish it?
6. Who can search it?
7. How are project boundaries enforced?
8. How does the knowledge connect to existing business systems?

Then select the technologies and AI components that support that workflow.

A practical architecture can remain straightforward:

\`\`\`mermaid
flowchart TD
    A["Document Ingestion"] --> B["Document Processing"]
    B --> C["AI-Assisted Structuring"]
    C --> D["Human Review Gate"]
    D --> E["Knowledge Repository"]
    E --> F["Fast Search Layer"]
    F --> G["Business Application & Users"]
\`\`\`

The sophistication should come from solving the actual business problem, not from adding technology for its own sake.

---

## Conclusion

Turning complex PDFs into structured knowledge is not primarily a PDF problem.

It is a **knowledge workflow problem**.

Text extraction gives you the words. AI can help interpret the structure and transform those words into useful content.

But a production knowledge system also needs:

- structured data
- search
- permissions
- review
- publishing controls
- integration with the surrounding business workflow

The most useful architecture is therefore not:

\`\`\`text
PDF → AI → Answer
\`\`\`

It is closer to:

\`\`\`mermaid
flowchart LR
    A["PDF"] --> B["Understand"]
    B --> C["Structure"]
    C --> D["Review"]
    D --> E["Publish"]
    E --> F["Search"]
    F --> G["Use"]
\`\`\`

That shift, from extracting documents to engineering a knowledge workflow, is where AI-assisted document processing becomes genuinely useful.
`;

export const ARTICLE_001_ID = `
# Mengubah PDF Kompleks Menjadi Knowledge yang Terstruktur

Banyak bisnis mengumpulkan knowledge jauh sebelum mereka memiliki sistem untuk mengelolanya.

Policy, manual, prosedur, laporan, materi training, operational guide, hingga berbagai dokumen internal sering kali berakhir dalam bentuk PDF. Informasinya sebenarnya ada, tetapi belum tentu mudah dicari, dikelola, diperbarui, atau digunakan kembali.

Akhirnya muncul masalah yang cukup umum:

> **Bisnis sebenarnya sudah memiliki knowledge-nya, tetapi knowledge tersebut masih terjebak di dalam dokumen.**

PDF text extraction dapat membantu mengambil teks dari dokumen tersebut. Tetapi itu baru langkah awal.

Kalau tujuannya adalah membangun knowledge system yang benar-benar berguna, sistem tidak cukup hanya membaca teks. Sistem juga perlu memahami struktur dokumen, mengubah struktur tersebut menjadi content yang bermakna, mengategorikannya, lalu menyediakan workflow agar manusia dapat melakukan review sebelum knowledge tersebut dipublikasikan.

Di sinilah **AI-assisted document processing** mulai menjadi menarik.

---

## Kenapa PDF Tidak Sesederhana Kelihatannya?

Bagi manusia, PDF biasanya terlihat seperti dokumen biasa.

Bagi software, strukturnya bisa jauh lebih kompleks.

Sebuah dokumen dapat memiliki:

- heading
- paragraph
- table
- list
- page break
- header dan footer yang berulang
- section
- caption
- reference
- hierarchy antarbagian

Bahkan ketika text berhasil diekstrak, hasilnya belum tentu mempertahankan struktur dan hubungan antarbagian seperti yang dipahami manusia.

Misalnya sistem mendapatkan hasil seperti:

\`\`\`text
Customer Eligibility

The following customers are eligible...

1. Existing customers
2. New customers
3. Corporate customers

Required Documents

...
\`\`\`

Secara teknis, teks tersebut sudah berhasil diekstrak.

Tetapi knowledge system mungkin tidak membutuhkan satu blok teks besar.

Sistem mungkin membutuhkan sesuatu seperti:

\`\`\`text
Title:
Customer Eligibility

Category:
Customer Policy

Content:
...

Related Topic:
Required Documents
\`\`\`

Perbedaannya penting.

Yang pertama adalah **hasil ekstraksi teks**.

Yang kedua adalah **structured knowledge**.

---

## Text Extraction Baru Langkah Pertama

Salah satu kesalahan paling umum adalah menganggap PDF processing hanya sebagai masalah mengambil teks dari PDF.

Pipeline sederhana mungkin terlihat seperti ini:

\`\`\`mermaid
flowchart TD
    A["Dokumen PDF"] --> B["Ekstraksi Teks"]
    B --> C["Database"]
\`\`\`

Untuk beberapa use case, pendekatan tersebut memang cukup.

Tetapi kalau targetnya adalah knowledge system, pipeline-nya biasanya membutuhkan beberapa tahap tambahan:

\`\`\`mermaid
flowchart TD
    A["Dokumen PDF"] --> B["Document Understanding"]
    B --> C["Structure Recognition"]
    C --> D["Content Generation"]
    D --> E["Classification"]
    E --> F["Human Review"]
    F --> G["Structured Knowledge"]
    G --> H["Search & Retrieval"]
\`\`\`

Perubahan cara berpikirnya adalah dari:

> "Apakah kita bisa mengambil teksnya?"

menjadi:

> **"Apakah kita cukup memahami dokumen tersebut untuk mengubah informasinya menjadi sesuatu yang berguna?"**

---

## Apa Sebenarnya yang Dimaksud dengan Structured Knowledge?

Structured knowledge tidak selalu berarti setiap kalimat harus dimasukkan ke dalam database dengan schema yang sangat rigid.

Intinya adalah memberikan cukup struktur agar informasi tersebut dapat digunakan oleh sistem lain.

Misalnya satu knowledge item dapat memiliki:

\`\`\`text
Title
Category
Content
Source Document
Related Project
Metadata
Publication Status
\`\`\`

Schema sebenarnya bergantung pada kebutuhan bisnis.

Yang penting adalah sistem menghasilkan unit knowledge yang konsisten.

Dengan begitu workflow berikutnya menjadi lebih mudah:

\`\`\`mermaid
flowchart LR
    A["Dokumen Sumber"] --> B["Knowledge Items"]
    B --> C["Search Layer"]
    C --> D["Admin Review"]
    D --> E["Publikasi"]
    E --> F["Akses User"]
\`\`\`

Daripada menganggap PDF sebagai satu object yang tidak bisa diolah, sistem dapat memperlakukannya sebagai kumpulan knowledge yang bisa dicari dan dikelola.

---

## Pipeline PDF ke Knowledge

Pendekatan yang praktis dapat dibagi menjadi empat tahap:

\`\`\`mermaid
flowchart TD
    A["Input PDF"] --> B["1. Membaca Dokumen (Read)"]
    B --> C["2. Memahami Struktur (Understand)"]
    C --> D["3. Menghasilkan Structured Content (Generate)"]
    D --> E["4. Review Sebelum Publish (Review)"]
    E --> F["Knowledge Base Terpublikasi"]
\`\`\`

Masing-masing tahap memiliki tanggung jawab berbeda.

### 1. Membaca Dokumen

Tahap pertama adalah membuat dokumen dapat diproses oleh sistem.

PDF perlu di-ingest dan informasi yang dibutuhkan harus diekstrak agar dapat diteruskan ke tahap berikutnya.

Tujuan tahap ini bukan menghasilkan knowledge final.

Tujuannya sederhana:

> **Membuat dokumen tersedia dalam bentuk yang dapat dipahami oleh processing pipeline.**

Memisahkan tahap ini dari tahap berikutnya membantu membuat arsitektur lebih modular.

### 2. Memahami Struktur Dokumen

Setelah dokumen dapat dibaca, masalah berikutnya adalah memahami bagaimana dokumen tersebut disusun.

Sistem perlu mengenali hal-hal seperti:

- di mana sebuah section dimulai dan berakhir
- mana yang merupakan heading
- content mana yang termasuk dalam sebuah section
- informasi mana yang layak menjadi category
- bagian mana yang sebenarnya masih memiliki hubungan satu sama lain

Di sinilah AI-assisted processing dapat memberikan nilai yang cukup besar.

Daripada seluruh interpretasi bergantung pada rule yang sudah ditentukan sebelumnya, AI dapat membantu memahami struktur semantik dokumen.

Tujuannya bukan sekadar:

\`\`\`text
Extract everything
\`\`\`

tetapi:

\`\`\`text
Understand what the extracted information represents
\`\`\`

### 3. Menghasilkan Structured Content

Setelah struktur dokumen dipahami, sistem dapat menghasilkan field yang dibutuhkan oleh knowledge platform.

Misalnya:

\`\`\`mermaid
flowchart TD
    A["PDF Ingestion"] --> B["Document Understanding"]
    B --> C["Title"]
    B --> D["Category"]
    B --> E["Content"]
    B --> F["Metadata"]
\`\`\`

AI dapat membantu menghasilkan:

- title yang lebih relevan
- category yang sesuai
- content yang terstruktur
- format yang lebih konsisten

Tetapi ada satu kata yang penting:

> **mengusulkan.**

Output AI sebaiknya tidak langsung dianggap sebagai knowledge final.

AI menghasilkan draft yang kemudian masuk ke workflow berikutnya.

### 4. Review Sebelum Publish

Ini adalah salah satu bagian terpenting dari workflow.

Content yang dihasilkan AI sebaiknya melewati tahap administrative review.

\`\`\`mermaid
flowchart LR
    A["AI Processing"] --> B["Draft Knowledge"]
    B --> C["Admin Review"]
    C --> D{"Approve / Edit / Reject"}
    D -->|Approved| E["Published Knowledge"]
    D -->|Rejected| F["Revise / Discard"]
\`\`\`

Inilah yang disebut **human-in-the-loop**.

Tujuannya bukan membuat automation menjadi lambat.

Tujuannya adalah memberikan batas kontrol yang jelas terhadap automation.

Untuk business knowledge, content yang salah bisa lebih berbahaya daripada dokumen yang belum diproses karena user dapat menganggap informasi tersebut sudah terstruktur dan valid.

Human review menjadi quality gate terakhir sebelum knowledge masuk ke sistem.

---

## Di Mana AI Memberikan Nilai?

AI sangat berguna ketika proses transformasi membutuhkan interpretation, bukan sekadar extraction.

Misalnya sistem dapat membantu menjawab:

\`\`\`mermaid
flowchart TD
    A["Dokumen"] --> B["'Apa topik utama section ini?'"]
    B --> C["Title"]
    C --> D["'Masuk ke category apa?'"]
    D --> E["Category"]
    E --> F["'Informasi apa yang seharusnya menjadi knowledge content?'"]
    F --> G["Content"]
\`\`\`

Ini berbeda dengan sekadar meminta AI membuat summary dari setiap PDF.

Tujuannya adalah menghasilkan output yang sesuai dengan schema dan workflow knowledge platform.

Dengan kata lain, AI seharusnya bekerja **di dalam workflow yang sudah didefinisikan**, bukan berdiri sendiri.

---

## Kenapa Human Review Tetap Penting?

Automation tidak menghilangkan kebutuhan terhadap judgment.

Automation hanya mengubah di mana judgment tersebut dilakukan.

Model yang lebih masuk akal adalah:

\`\`\`text
Machine:
- Process
- Interpret
- Draft
- Classify

Human:
- Review
- Correct
- Approve
- Publish
\`\`\`

Hal ini semakin penting ketika dokumen mengandung informasi yang memengaruhi operational workflow bisnis.

Human reviewer dapat menemukan:

- interpretasi yang salah
- context yang hilang
- category yang tidak tepat
- title yang misleading
- content yang seharusnya tidak dipublikasikan

Dengan demikian, sistem bukan sepenuhnya manual dan bukan juga automation yang berjalan tanpa kontrol.

Modelnya menjadi:

> **AI-assisted knowledge production dengan human control.**

Pendekatan human + AI seperti ini juga sejalan dengan arah riset knowledge management modern, yang menempatkan AI sebagai pendukung proses knowledge creation, storage, retrieval, dan application, bukan sebagai pengganti penuh judgment manusia.

---

## Merancang Knowledge Layer

Document processing hanyalah salah satu bagian dari sistem.

Knowledge yang sudah dihasilkan tetap membutuhkan tempat untuk disimpan dan digunakan.

Secara konseptual:

\`\`\`mermaid
flowchart TD
    A["PDF Documents"] --> B["Document Processing"]
    B --> C["Structured Knowledge"]
    C --> D["Database"]
    C --> E["Search"]
    D --> F["Knowledge UI"]
    E --> F
    F --> G["Users"]
\`\`\`

Untuk sistem yang lebih besar, access control dan project boundaries juga menjadi penting.

Knowledge system tidak selalu memiliki satu pool knowledge yang dapat diakses semua orang.

Satu project dapat memiliki:

- user sendiri
- knowledge sendiri
- permission sendiri
- context sendiri

Karena itu, boundary tersebut harus menjadi bagian dari architecture sejak awal.

---

## Search Juga Bagian dari Masalah

Structured knowledge hanya berguna jika user dapat menemukannya.

Di sinilah document processing terhubung langsung dengan search.

Secara sederhana:

\`\`\`mermaid
flowchart TD
    A["Better Document Understanding"] --> B["Better Structured Knowledge"]
    B --> C["Better Searchable Content"]
    C --> D["Better Knowledge Retrieval"]
\`\`\`

Search juga memengaruhi bagaimana content sebaiknya disusun sejak awal.

Kalau knowledge item memiliki title, category, dan content boundary yang jelas, search layer memiliki informasi yang lebih bermakna untuk digunakan.

Karena itu document processing dan search sebaiknya tidak diperlakukan sebagai dua masalah yang sepenuhnya terpisah.

Keduanya adalah bagian dari satu knowledge workflow.

---

## Contoh di Dunia Nyata

Salah satu contoh yang kami kerjakan adalah enterprise knowledge management system untuk lingkungan client.

Sistem tersebut dirancang sebagai multi-project knowledge platform.

Secara konseptual:

\`\`\`mermaid
flowchart TD
    Org["Organization"] --> ProjA["Project A"]
    Org --> ProjB["Project B"]
    ProjA --> UsersA["Users"]
    ProjA --> KnowA["Knowledge"]
    ProjB --> UsersB["Users"]
    ProjB --> KnowB["Knowledge"]
\`\`\`

Platform ini dibangun dari awal menggunakan **Laravel**, dengan **Meilisearch** sebagai search layer.

Salah satu workflow khusus di dalamnya adalah **AI-assisted document processing**.

Alurnya:

\`\`\`mermaid
flowchart LR
    PDF["PDF"] --> Read["Read"]
    Read --> Struct["Understand Structure"]
    Struct --> Gen["Generate Title / Category / Content"]
    Gen --> Review["Admin Review"]
    Review --> Pub["Publish"]
\`\`\`

Sistem tersebut juga sudah memiliki integration dengan **MARS Outbound, QMS, dan CRM**.

Pelajaran engineering yang penting bukan sekadar bahwa AI dapat memproses PDF.

Produk sebenarnya adalah workflow yang mengelilingi AI tersebut.

Secara keseluruhan:

\`\`\`text
Document
+
AI Processing
+
Structured Data
+
Search
+
Permissions
+
Review
+
Business Integrations
\`\`\`

Kombinasi inilah yang mengubah sebuah AI capability menjadi business application.

---

## Kesalahan yang Sering Terjadi

### 1. Menganggap Semua PDF Sebagai Plain Text

Text extraction dapat menghilangkan hubungan antar-section dan konteksnya.

Kalau tujuan akhirnya adalah knowledge system, struktur tetap penting.

### 2. Mengirim Seluruh Dokumen ke AI Lalu Langsung Publish

Cara tersebut memang dapat menghasilkan output yang terlihat bagus.

Tetapi content yang terlihat rapi belum tentu sama dengan business knowledge yang dapat dipercaya.

Sistem tetap membutuhkan:

- output structure
- validation
- review
- publishing controls

### 3. Memulai dari AI Model, Bukan dari Workflow

Sangat mudah untuk memulai diskusi dengan:

> "Model AI apa yang harus kita gunakan?"

Pertanyaan yang lebih baik adalah:

> **"Apa yang harus terjadi pada sebuah dokumen sejak di-upload sampai menjadi published knowledge?"**

Model AI hanyalah salah satu komponen di dalam workflow tersebut.

### 4. Mengabaikan Destination Schema

Kalau knowledge platform membutuhkan:

\`\`\`text
Title
Category
Content
\`\`\`

maka processing pipeline sebaiknya memang dirancang untuk menghasilkan field tersebut.

Jangan membuat AI menghasilkan generic summary lalu menambahkan proses manual lain hanya untuk mengubahnya ke format yang dibutuhkan sistem.

### 5. Melupakan Human Review

Automation seharusnya mengurangi pekerjaan yang repetitif.

Bukan berarti accountability harus dihilangkan.

Untuk banyak business workflow, architecture yang lebih masuk akal adalah:

\`\`\`text
AI → Review → Publish
\`\`\`

bukan:

\`\`\`text
AI → Publish
\`\`\`

### 6. Menganggap Search Sebagai Fitur Tambahan

Kalau tujuan akhirnya adalah knowledge retrieval, search harus memengaruhi information architecture sejak awal.

Document pipeline dan search layer sebaiknya dirancang sebagai bagian dari sistem yang sama.

---

## Apa yang Kami Rekomendasikan?

Kalau sebuah bisnis ingin mengubah koleksi dokumen menjadi knowledge system yang searchable, jangan mulai dari pertanyaan:

> "Model AI apa yang paling bagus?"

Mulailah dari workflow.

Tentukan:

1. Dokumen seperti apa yang masuk?
2. Informasi apa yang perlu diambil?
3. Struktur knowledge seperti apa yang dibutuhkan?
4. Siapa yang melakukan review?
5. Siapa yang boleh publish?
6. Siapa yang dapat mencari knowledge?
7. Bagaimana project boundaries diterapkan?
8. Bagaimana knowledge terhubung dengan business system lain?

Setelah itu baru pilih technology dan AI component yang mendukung workflow tersebut.

Architecture sederhananya bisa seperti:

\`\`\`mermaid
flowchart TD
    A["Document Ingestion"] --> B["Document Processing"]
    B --> C["AI-Assisted Structuring"]
    C --> D["Human Review"]
    D --> E["Knowledge Repository"]
    E --> F["Search"]
    F --> G["Business Application"]
\`\`\`

Sistem tidak perlu dibuat kompleks hanya karena menggunakan AI.

Yang penting adalah kompleksitas tersebut digunakan untuk menyelesaikan business problem yang nyata.

---

## Kesimpulan

Mengubah PDF kompleks menjadi structured knowledge sebenarnya bukan terutama masalah PDF.

Ini adalah **knowledge workflow problem**.

Text extraction memberikan kita kata-katanya.

AI dapat membantu memahami struktur dan mengubah informasi tersebut menjadi content yang lebih berguna.

Tetapi production knowledge system juga membutuhkan:

- structured data
- search
- permissions
- review
- publishing controls
- integration dengan business workflow

Karena itu architecture-nya bukan sekadar:

\`\`\`text
PDF → AI → Answer
\`\`\`

Tetapi lebih dekat ke:

\`\`\`mermaid
flowchart LR
    A["PDF"] --> B["Understand"]
    B --> C["Structure"]
    C --> D["Review"]
    D --> E["Publish"]
    E --> F["Search"]
    F --> G["Use"]
\`\`\`

Perubahan cara berpikir dari sekadar **mengekstrak dokumen** menjadi **membangun knowledge workflow** adalah bagian yang membuat AI-assisted document processing benar-benar berguna.
`;
