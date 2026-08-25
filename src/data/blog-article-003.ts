// Article content for Article #003: RAG vs Search
// Faithfully extracted from docs/blog/articles/003_RAG_vs_Search_EN.md (section 03)
// and docs/blog/articles/003_RAG_vs_Search_ID.md (section 03)
// Only editorial metadata and editorial notes removed.
// ASCII diagrams converted to Mermaid where appropriate.
// Citation markers (citeturn...) stripped.

export const ARTICLE_003_EN = `
# RAG vs Search: What Should a Business Knowledge System Use?

When businesses start exploring AI for internal knowledge, the conversation often jumps immediately to RAG.

The idea sounds compelling:

> Put the company's documents into a knowledge base, connect an LLM, and let employees ask questions.

Retrieval-Augmented Generation can indeed be a powerful architecture. It allows an LLM to retrieve relevant external information and use that context when generating an answer.

But there is an important question that often gets skipped:

> **Does the business actually need generated answers, or does it primarily need better search?**

Those are different product requirements.

Sometimes the best knowledge system is a search interface.

Sometimes it is RAG.

And sometimes the best architecture is both.

---

## Search and RAG Solve Different Problems

At a high level:

\`\`\`mermaid
flowchart TD
    subgraph Search
        A1[User Query] --> A2[Retrieve Documents] --> A3[Show Results]
    end
    subgraph RAG
        B1[User Question] --> B2[Retrieve Relevant Context] --> B3[LLM] --> B4[Generated Answer]
    end
\`\`\`

The key difference is not simply "AI versus no AI."

It is:

> **Does the system need to retrieve information, or retrieve information and synthesize it into an answer?**

A conventional search system exposes the underlying results.

A RAG system uses retrieved information as context for generation.

That distinction has consequences for UX, architecture, evaluation, security, and trust.

---

## What Search Does Well

Search is often underrated because it is less exciting than an AI assistant.

But search has a major advantage:

> **It shows the source.**

A user can search:

\`\`\`
customer eligibility
\`\`\`

and receive:

- Customer Eligibility Policy
- Customer Verification Guide
- Corporate Customer Procedure

The user can inspect the documents and decide which one is relevant.

This is useful when users already understand the domain and mainly need to find the right information.

Search is particularly strong for:

- known-item retrieval
- exact terms
- identifiers
- policy names
- technical documentation
- browsing
- filtering
- document discovery
- auditability

---

## What RAG Adds

RAG changes the interaction from:

> "Find me the document."

to:

> "Answer my question using the relevant knowledge."

A simplified architecture looks like:

\`\`\`mermaid
flowchart TD
    A[User Question] --> B[Query Processing]
    B --> C[Retrieval]
    C --> D[Relevant Knowledge]
    D --> E["Prompt / Context"]
    E --> F[LLM]
    F --> G[Generated Answer]
\`\`\`

The retrieval step is essential.

The LLM is not supposed to invent the answer from general model knowledge.

Instead, the system retrieves relevant information from the organization's knowledge source and supplies that information as context.

This is the core idea behind RAG.

---

## RAG Is Not a Replacement for Search

This is one of the most important architectural points.

A RAG system still needs retrieval.

In fact:

> **RAG quality depends heavily on retrieval quality.**

If the system retrieves the wrong content, the LLM receives the wrong context.

The pipeline becomes:

\`\`\`mermaid
flowchart TD
    A[Bad Retrieval] --> B[Bad Context]
    B --> C[Confident Answer]
    C --> D[Bad User Experience]
    style A fill:#fee,stroke:#c33
    style D fill:#fee,stroke:#c33
\`\`\`

This is why RAG should not be treated as a magical layer that sits on top of poor information architecture.

The underlying knowledge still needs to be:

- discoverable
- structured
- permission-aware
- current
- relevant
- retrievable

---

## The Three-Layer Model

For business knowledge systems, it is useful to separate three concerns.

\`\`\`mermaid
flowchart TD
    A[Knowledge] --> B[Retrieval]
    B --> C[Search]
    B --> D[RAG]
    C --> E[Documents]
    D --> F[Answers]
\`\`\`

The knowledge layer stores and manages information.

The retrieval layer finds relevant information.

The presentation layer determines how that information reaches the user.

Search and RAG can therefore share the same underlying knowledge source.

This is a much better architecture than treating them as mutually exclusive technologies.

---

## When Search Is Enough

There are many cases where RAG is unnecessary.

### 1. Users Need the Original Document

Suppose an employee searches:

\`\`\`
QMS policy 2026
\`\`\`

The employee may want to open the official policy.

Generating an answer may actually add an unnecessary layer.

The source document is the product.

### 2. Exact Wording Matters

Some information should be inspected in its original form.

Examples:

- contractual clauses
- policy language
- technical specifications
- compliance requirements
- legal references

In these cases, showing the source can be more useful than generating a summary.

### 3. Users Know What They Are Looking For

If the user already knows the document name, category, or identifier, search may be the fastest path.

\`\`\`
Policy-2026-04
\`\`\`

does not necessarily need an LLM.

### 4. Auditability Is the Primary Requirement

Sometimes the important question is:

> "Where did this information come from?"

A search result directly exposes the source.

A generated answer requires additional mechanisms to show citations and traceability.

---

## When RAG Becomes Valuable

RAG becomes more interesting when users are asking questions rather than looking for documents.

### 1. Users Don't Know the Terminology

A user might ask:

\`\`\`
What documents do I need before this customer can be approved?
\`\`\`

The knowledge base may use terminology such as:

\`\`\`
Customer Qualification Requirements
\`\`\`

RAG can use retrieved context to formulate an answer in the language of the user.

### 2. The Answer Requires Multiple Sources

Consider:

\`\`\`
What is the process for handling an incomplete customer submission?
\`\`\`

The answer may require information from:

- Eligibility Policy
- Document Requirements
- Exception Procedure

A search interface can return those documents.

A RAG system can retrieve them and synthesize the relevant information into one response.

### 3. Users Need Conversational Interaction

If the product requirement is:

\`\`\`
User: What is our policy for X?
AI: Based on the current policy...
User: What about exception Y?
AI: For exception Y...
\`\`\`

then conversational retrieval becomes a natural requirement.

Search alone does not provide that interaction model.

---

## The Hidden Cost of RAG

RAG is useful, but it introduces additional engineering responsibilities.

A production RAG system is more than Vector Database + LLM.

A typical architecture can involve:

\`\`\`mermaid
flowchart TD
    A[Document Ingestion] --> B[Chunking]
    B --> C[Embedding]
    C --> D[Indexing]
    D --> E[Retrieval]
    E --> F[Reranking]
    F --> G[Context Assembly]
    G --> H[LLM]
    H --> I["Citation / Response"]
    I --> J[Evaluation]
\`\`\`

Every additional layer introduces another potential failure mode.

That means RAG should be added because it solves a real product problem—not because it is currently popular.

---

## Search Is Easier to Explain

Consider these two experiences.

### Search

\`\`\`mermaid
flowchart TD
    A[Query] --> B[Results] --> C[Source Document]
\`\`\`

The user can inspect the result.

### RAG

\`\`\`mermaid
flowchart TD
    A[Question] --> B[Retrieval] --> C[Context] --> D[LLM] --> E[Answer]
\`\`\`

Now the system has to answer additional questions:

- Which documents were retrieved?
- Why were they retrieved?
- Did the answer use the correct context?
- Did the model omit important information?
- Did the model combine sources correctly?
- Can the user verify the answer?
- Are citations accurate?

RAG therefore increases the product's responsibility.

---

## The Importance of Citations

For enterprise knowledge systems, generated answers should ideally remain traceable to their source material.

A useful experience might look like:

\`\`\`
Answer:
Customers must provide the required verification documents
before approval.

Sources:
• Customer Verification Policy
• Customer Approval Procedure
\`\`\`

This changes the interaction from:

> "Trust the AI."

to:

> **"Here is the answer, and here is where it came from."**

That distinction is important for business adoption.

---

## Retrieval Quality Comes Before Generation Quality

A common mistake is spending too much time comparing LLMs while ignoring retrieval.

Consider:

\`\`\`
Model A + Good Retrieval
        vs
Model B + Bad Retrieval
\`\`\`

The first system can easily produce the better business result.

The model cannot reliably answer from information it never received.

That means teams should evaluate:

\`\`\`mermaid
flowchart TD
    A[Retrieval] --> B[Context Quality] --> C[Answer Quality]
\`\`\`

rather than measuring only the final generated response.

For enterprise RAG, retrieval quality is therefore an engineering concern in its own right.

---

## Search + RAG Can Be Better Than RAG Alone

A strong knowledge product does not have to hide search behind the chatbot.

It can provide both:

\`\`\`mermaid
flowchart TD
    A[Knowledge System] --> B[Search]
    A --> C[AI]
    B --> D[Source Results]
    C --> E[Answer]
    D --> F[User]
    E --> F
\`\`\`

The user can choose the interaction they need.

For example:

- "Find the policy" → Search
- "Explain the policy" → RAG

This is often a better product model than forcing every question through an LLM.

---

## A Real-World Knowledge System

In the enterprise knowledge management system we built for a client, the platform was designed around multiple projects, each with its own users and knowledge context.

The architecture included:

- Laravel
- Meilisearch
- AI-assisted document processing
- Admin review before publication
- integrations with MARS Outbound, QMS, and CRM

The document workflow was:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Read]
    B --> C[Understand Structure]
    C --> D["Generate Title / Category / Content"]
    D --> E[Admin Review]
    E --> F[Publish]
\`\`\`

This project is a useful example of why knowledge architecture should come before adding an AI interface.

The system already had a structured knowledge workflow and search layer.

That is the foundation.

Whether a future product layer should add RAG, a conversational assistant, or another retrieval experience is a separate architectural decision.

Importantly, the project facts available to us do **not** establish that RAG was implemented, so this article does not claim that it was.

---

## A Practical Decision Framework

Use this framework before deciding to build RAG.

### Choose Search When

- Users need documents
- Users know terminology
- Exact terms matter
- Source inspection matters
- Filtering matters
- Auditability is important

### Choose RAG When

- Users ask natural-language questions
- Answers require synthesis
- Multiple sources may be needed
- Users need conversational interaction
- The system can provide reliable citations
- Retrieval quality can be evaluated

### Choose Both When

- Users sometimes want documents
- Users sometimes want answers

This is common in enterprise knowledge systems.

---

## A Simple Architecture Progression

Instead of building everything at once:

\`\`\`mermaid
flowchart TD
    A["Phase 1: Structured Knowledge"] --> B["Phase 2: Full-Text Search"]
    B --> C["Phase 3: Semantic / Hybrid Retrieval"]
    C --> D["Phase 4: RAG"]
    D --> E["Phase 5: Citations + Evaluation"]
\`\`\`

This progression has an important advantage:

> **Every layer is added because the previous layer exposes a real product need.**

You can start with search.

Then observe actual user behavior.

If users repeatedly ask questions that require synthesis, add RAG.

If retrieval becomes the bottleneck, improve retrieval.

If users need citations, add citation-aware response generation.

Architecture becomes evolutionary rather than speculative.

---

## What About a Chatbot?

A chatbot is a user interface.

RAG is an architecture pattern.

They should not be treated as the same thing.

You can build Search UI + RAG API without building a chatbot.

Likewise, a chatbot does not automatically mean the underlying system uses RAG.

The important architectural question remains:

> **How does the application retrieve and use trusted knowledge?**

---

## The Real Product Is the Knowledge System

It is tempting to think of the final product as:

\`\`\`
PDF → AI → Chatbot
\`\`\`

But a production business knowledge system is closer to:

\`\`\`mermaid
flowchart TD
    A[Documents] --> B[Processing]
    B --> C[Structured Knowledge]
    C --> D[Permissions]
    D --> E["Search / Retrieval"]
    E --> F[Optional RAG]
    F --> G[Citations]
    G --> H[User]
\`\`\`

The AI assistant is only one possible interface on top of that foundation.

This distinction becomes increasingly important as organizations move from AI prototypes into operational systems.

---

## What We Would Recommend

Our recommendation is simple:

> **Build the knowledge system first. Add RAG when the product actually needs generated answers.**

Start with:

1. Structured knowledge
2. Clear metadata
3. Permissions
4. Search
5. Real user queries
6. Retrieval evaluation

Then ask: **Are users finding what they need?**

If yes, you may not need RAG yet.

If no, determine why.

Is it:

- Poor content?
- Poor indexing?
- Poor retrieval?
- Poor information architecture?
- Or do users actually need answer synthesis?

Only the last problem necessarily points toward RAG.

---

## Conclusion

RAG is powerful, but it is not the definition of an AI knowledge system.

Search helps users **find knowledge**.

RAG helps applications **use retrieved knowledge to generate an answer**.

Those capabilities can coexist.

The best architecture depends on the user's actual task.

A practical progression is:

\`\`\`mermaid
flowchart TD
    A[Structured Knowledge] --> B[Search]
    B --> C[Evaluate]
    C --> D["Semantic / Hybrid Retrieval"]
    D --> E[Add RAG When Needed]
\`\`\`

The goal is not to build the most sophisticated AI architecture.

The goal is to build the simplest architecture that gives users trustworthy access to the knowledge they need.

> **Don't build RAG because you can. Build it when generated answers solve a problem that search alone cannot.**
`;

export const ARTICLE_003_ID = `
# RAG vs Search: Apa yang Sebaiknya Digunakan untuk Business Knowledge System?

Ketika bisnis mulai mengeksplorasi AI untuk internal knowledge, pembahasannya sering langsung melompat ke RAG.

Gagasannya memang terdengar menarik:

> Masukkan dokumen perusahaan ke knowledge base, hubungkan LLM, lalu biarkan karyawan bertanya.

Retrieval-Augmented Generation memang dapat menjadi architecture yang sangat berguna. RAG memungkinkan LLM mengambil informasi eksternal yang relevan dan menggunakan context tersebut saat menghasilkan jawaban.

Namun ada satu pertanyaan penting yang sering dilewati:

> **Apakah bisnis benar-benar membutuhkan jawaban yang dihasilkan AI, atau sebenarnya mereka hanya membutuhkan search yang lebih baik?**

Keduanya adalah product requirement yang berbeda.

Kadang-kadang knowledge system terbaik memang cukup berupa search interface.

Kadang RAG adalah pilihan yang tepat.

Dan kadang architecture terbaik adalah kombinasi keduanya.

---

## Search dan RAG Menyelesaikan Masalah yang Berbeda

Secara garis besar:

\`\`\`mermaid
flowchart TD
    subgraph Search
        A1[User Query] --> A2[Retrieve Documents] --> A3[Tampilkan Hasil]
    end
    subgraph RAG
        B1[User Question] --> B2[Retrieve Relevant Context] --> B3[LLM] --> B4[Generated Answer]
    end
\`\`\`

Perbedaan utamanya bukan sekadar "AI versus non-AI."

Melainkan:

> **Apakah system hanya perlu mengambil informasi, atau mengambil informasi DAN mensintesisnya menjadi jawaban?**

Search system konvensional menampilkan hasil yang mendasarinya.

RAG system menggunakan informasi yang di-retrieve sebagai context untuk generation.

Perbedaan ini berdampak pada UX, architecture, evaluation, keamanan, dan kepercayaan.

---

## Apa yang Search Lakukan dengan Baik?

Search sering diremehkan karena kurang menarik dibandingkan AI assistant.

Tetapi search memiliki keunggulan besar:

> **Search menunjukkan sumbernya.**

User bisa mencari:

\`\`\`
customer eligibility
\`\`\`

dan mendapat:

- Customer Eligibility Policy
- Customer Verification Guide
- Corporate Customer Procedure

User dapat memeriksa dokumen dan memutuskan mana yang relevan.

Ini berguna ketika user sudah memahami domain dan hanya perlu menemukan informasi yang tepat.

Search sangat kuat untuk:

- known-item retrieval
- exact terms
- identifier
- nama policy
- dokumentasi teknis
- browsing
- filtering
- document discovery
- auditability

---

## Apa yang RAG Tambahkan?

RAG mengubah interaksi dari:

> "Carikan saya dokumennya."

menjadi:

> "Jawab pertanyaan saya menggunakan knowledge yang relevan."

Architecture yang disederhanakan:

\`\`\`mermaid
flowchart TD
    A[User Question] --> B[Query Processing]
    B --> C[Retrieval]
    C --> D[Relevant Knowledge]
    D --> E["Prompt / Context"]
    E --> F[LLM]
    F --> G[Generated Answer]
\`\`\`

Langkah retrieval sangat penting.

LLM tidak seharusnya mengarang jawaban dari general model knowledge.

Sebaliknya, system mengambil informasi relevan dari knowledge source organisasi dan menyediakannya sebagai context.

Ini adalah ide inti di balik RAG.

---

## RAG Bukan Pengganti Search

Ini adalah salah satu poin arsitektur terpenting.

RAG system tetap membutuhkan retrieval.

Faktanya:

> **Kualitas RAG sangat bergantung pada kualitas retrieval.**

Jika system mengambil content yang salah, LLM menerima context yang salah.

Pipeline-nya menjadi:

\`\`\`mermaid
flowchart TD
    A[Retrieval Buruk] --> B[Context Buruk]
    B --> C[Jawaban Percaya Diri]
    C --> D[User Experience Buruk]
    style A fill:#fee,stroke:#c33
    style D fill:#fee,stroke:#c33
\`\`\`

Inilah mengapa RAG tidak boleh diperlakukan sebagai layer ajaib yang diletakkan di atas information architecture yang buruk.

Knowledge yang mendasarinya tetap harus:

- discoverable
- terstruktur
- permission-aware
- terkini
- relevan
- retrievable

---

## Model Tiga Layer

Untuk business knowledge system, berguna untuk memisahkan tiga concern.

\`\`\`mermaid
flowchart TD
    A[Knowledge] --> B[Retrieval]
    B --> C[Search]
    B --> D[RAG]
    C --> E[Dokumen]
    D --> F[Jawaban]
\`\`\`

Knowledge layer menyimpan dan mengelola informasi.

Retrieval layer menemukan informasi yang relevan.

Presentation layer menentukan bagaimana informasi tersebut sampai ke user.

Search dan RAG dapat berbagi knowledge source yang sama.

Ini adalah architecture yang jauh lebih baik daripada memperlakukan keduanya sebagai teknologi yang saling eksklusif.

---

## Kapan Search Sudah Cukup?

Ada banyak kasus di mana RAG tidak diperlukan.

### 1. User Membutuhkan Dokumen Asli

Misalnya seorang employee mencari:

\`\`\`
QMS policy 2026
\`\`\`

Employee tersebut mungkin ingin membuka policy resmi.

Menghasilkan jawaban justru bisa menambah layer yang tidak perlu.

Dokumen sumber itulah produknya.

### 2. Exact Wording Penting

Beberapa informasi harus dilihat dalam bentuk aslinya.

Contoh:

- klausul kontrak
- bahasa policy
- spesifikasi teknis
- persyaratan compliance
- referensi hukum

Dalam kasus ini, menampilkan sumber bisa lebih berguna daripada menghasilkan ringkasan.

### 3. User Tahu Apa yang Dicari

Jika user sudah mengetahui nama dokumen, kategori, atau identifier, search mungkin adalah jalan tercepat.

\`\`\`
Policy-2026-04
\`\`\`

tidak perlu LLM.

### 4. Auditability Adalah Prioritas Utama

Kadang pertanyaan pentingnya adalah:

> "Informasi ini berasal dari mana?"

Search result langsung menunjukkan sumbernya.

Jawaban yang di-generate membutuhkan mekanisme tambahan untuk menampilkan citation dan traceability.

---

## Kapan RAG Menjadi Berharga?

RAG menjadi lebih menarik ketika user mengajukan pertanyaan, bukan mencari dokumen.

### 1. User Tidak Tahu Terminology-nya

User mungkin bertanya:

\`\`\`
Dokumen apa yang saya butuhkan sebelum customer ini bisa di-approve?
\`\`\`

Knowledge base mungkin menggunakan terminology:

\`\`\`
Customer Qualification Requirements
\`\`\`

RAG dapat menggunakan retrieved context untuk merumuskan jawaban dalam bahasa user.

### 2. Jawaban Membutuhkan Multiple Source

Pertimbangkan:

\`\`\`
Bagaimana proses menangani submission customer yang tidak lengkap?
\`\`\`

Jawabannya mungkin membutuhkan informasi dari:

- Eligibility Policy
- Document Requirements
- Exception Procedure

Search interface dapat mengembalikan dokumen-dokumen tersebut.

RAG system dapat mengambil dan mensintesis informasi relevan menjadi satu respons.

### 3. User Membutuhkan Interaksi Conversational

Jika product requirement-nya adalah:

\`\`\`
User: Apa policy kita untuk X?
AI: Berdasarkan policy saat ini...
User: Bagaimana dengan exception Y?
AI: Untuk exception Y...
\`\`\`

maka conversational retrieval menjadi kebutuhan alami.

Search saja tidak menyediakan interaction model tersebut.

---

## Hidden Cost dari RAG

RAG berguna, tetapi memperkenalkan tanggung jawab engineering tambahan.

Production RAG system lebih dari sekadar Vector Database + LLM.

Architecture tipikal dapat melibatkan:

\`\`\`mermaid
flowchart TD
    A[Document Ingestion] --> B[Chunking]
    B --> C[Embedding]
    C --> D[Indexing]
    D --> E[Retrieval]
    E --> F[Reranking]
    F --> G[Context Assembly]
    G --> H[LLM]
    H --> I["Citation / Response"]
    I --> J[Evaluation]
\`\`\`

Setiap layer tambahan memperkenalkan potensi failure mode baru.

Artinya RAG harus ditambahkan karena menyelesaikan masalah produk yang nyata — bukan karena sedang populer.

---

## Search Lebih Mudah Dijelaskan

Pertimbangkan dua pengalaman ini.

### Search

\`\`\`mermaid
flowchart TD
    A[Query] --> B[Results] --> C[Source Document]
\`\`\`

User dapat memeriksa hasilnya.

### RAG

\`\`\`mermaid
flowchart TD
    A[Question] --> B[Retrieval] --> C[Context] --> D[LLM] --> E[Answer]
\`\`\`

Sekarang system harus menjawab pertanyaan tambahan:

- Dokumen mana yang di-retrieve?
- Mengapa dokumen tersebut di-retrieve?
- Apakah jawaban menggunakan context yang benar?
- Apakah model menghilangkan informasi penting?
- Apakah model menggabungkan source dengan benar?
- Bisakah user memverifikasi jawabannya?
- Apakah citation-nya akurat?

RAG meningkatkan tanggung jawab produk.

---

## Pentingnya Citation

Untuk enterprise knowledge system, jawaban yang di-generate idealnya tetap traceable ke source material-nya.

Pengalaman yang berguna mungkin terlihat seperti:

\`\`\`
Jawaban:
Customer harus menyediakan dokumen verifikasi yang diperlukan
sebelum approval.

Sumber:
• Customer Verification Policy
• Customer Approval Procedure
\`\`\`

Ini mengubah interaksi dari:

> "Percaya AI."

menjadi:

> **"Ini jawabannya, dan ini dari mana asalnya."**

Perbedaan tersebut penting untuk adopsi bisnis.

---

## Kualitas Retrieval Lebih Penting dari Kualitas Generation

Kesalahan umum adalah menghabiskan terlalu banyak waktu membandingkan LLM sambil mengabaikan retrieval.

Pertimbangkan:

\`\`\`
Model A + Retrieval Bagus
        vs
Model B + Retrieval Buruk
\`\`\`

System pertama dapat dengan mudah menghasilkan business result yang lebih baik.

Model tidak dapat diandalkan untuk menjawab dari informasi yang tidak pernah diterimanya.

Artinya tim harus mengevaluasi:

\`\`\`mermaid
flowchart TD
    A[Retrieval] --> B[Context Quality] --> C[Answer Quality]
\`\`\`

daripada hanya mengukur generated response akhir.

Untuk enterprise RAG, kualitas retrieval adalah engineering concern tersendiri.

---

## Search + RAG Bisa Lebih Baik dari RAG Saja

Knowledge product yang kuat tidak harus menyembunyikan search di balik chatbot.

Bisa menyediakan keduanya:

\`\`\`mermaid
flowchart TD
    A[Knowledge System] --> B[Search]
    A --> C[AI]
    B --> D[Source Results]
    C --> E[Answer]
    D --> F[User]
    E --> F
\`\`\`

User dapat memilih interaksi yang mereka butuhkan.

Misalnya:

- "Carikan policy-nya" → Search
- "Jelaskan policy-nya" → RAG

Ini sering menjadi product model yang lebih baik daripada memaksa setiap pertanyaan melewati LLM.

---

## Contoh Knowledge System di Dunia Nyata

Dalam enterprise knowledge management system yang kami bangun untuk klien, platform dirancang di sekitar multiple project, masing-masing dengan user dan knowledge context sendiri.

Architecture-nya meliputi:

- Laravel
- Meilisearch
- AI-assisted document processing
- Admin review sebelum publikasi
- integrasi dengan MARS Outbound, QMS, dan CRM

Document workflow-nya:

\`\`\`mermaid
flowchart TD
    A[PDF] --> B[Read]
    B --> C[Understand Structure]
    C --> D["Generate Title / Category / Content"]
    D --> E[Admin Review]
    E --> F[Publish]
\`\`\`

Project ini adalah contoh berguna mengapa knowledge architecture harus dibangun sebelum menambahkan AI interface.

System sudah memiliki structured knowledge workflow dan search layer.

Itulah fondasinya.

Apakah product layer di masa depan perlu menambahkan RAG, conversational assistant, atau pengalaman retrieval lainnya adalah keputusan arsitektur yang terpisah.

Yang penting, fakta project yang tersedia **tidak** menyatakan bahwa RAG diimplementasikan, sehingga artikel ini tidak mengklaim hal tersebut.

---

## Framework Keputusan Praktis

Gunakan framework ini sebelum memutuskan untuk membangun RAG.

### Pilih Search Ketika

- User membutuhkan dokumen
- User mengetahui terminology
- Exact terms penting
- Inspeksi sumber penting
- Filtering penting
- Auditability penting

### Pilih RAG Ketika

- User mengajukan pertanyaan natural-language
- Jawaban membutuhkan sintesis
- Multiple source mungkin diperlukan
- User membutuhkan interaksi conversational
- System dapat menyediakan citation yang reliable
- Kualitas retrieval dapat dievaluasi

### Pilih Keduanya Ketika

- User kadang membutuhkan dokumen
- User kadang membutuhkan jawaban

Ini umum terjadi di enterprise knowledge system.

---

## Progression Architecture yang Sederhana

Daripada membangun semuanya sekaligus:

\`\`\`mermaid
flowchart TD
    A["Phase 1: Structured Knowledge"] --> B["Phase 2: Full-Text Search"]
    B --> C["Phase 3: Semantic / Hybrid Retrieval"]
    C --> D["Phase 4: RAG"]
    D --> E["Phase 5: Citations + Evaluation"]
\`\`\`

Progression ini memiliki keunggulan penting:

> **Setiap layer ditambahkan karena layer sebelumnya memperlihatkan kebutuhan produk yang nyata.**

Anda bisa mulai dengan search.

Kemudian amati perilaku user yang sebenarnya.

Jika user berulang kali mengajukan pertanyaan yang membutuhkan sintesis, tambahkan RAG.

Jika retrieval menjadi bottleneck, perbaiki retrieval.

Jika user membutuhkan citation, tambahkan citation-aware response generation.

Architecture menjadi evolutionary, bukan spekulatif.

---

## Bagaimana dengan Chatbot?

Chatbot adalah user interface.

RAG adalah architecture pattern.

Keduanya tidak boleh diperlakukan sebagai hal yang sama.

Anda bisa membangun Search UI + RAG API tanpa membangun chatbot.

Begitu juga sebaliknya, chatbot tidak otomatis berarti system di belakangnya menggunakan RAG.

Pertanyaan arsitektur yang penting tetap:

> **Bagaimana aplikasi mengambil dan menggunakan knowledge yang terpercaya?**

---

## Produk Sebenarnya Adalah Knowledge System

Mudah untuk berpikir produk akhirnya adalah:

\`\`\`
PDF → AI → Chatbot
\`\`\`

Tetapi production business knowledge system lebih mendekati:

\`\`\`mermaid
flowchart TD
    A[Documents] --> B[Processing]
    B --> C[Structured Knowledge]
    C --> D[Permissions]
    D --> E["Search / Retrieval"]
    E --> F[Optional RAG]
    F --> G[Citations]
    G --> H[User]
\`\`\`

AI assistant hanyalah satu kemungkinan interface di atas fondasi tersebut.

Perbedaan ini menjadi semakin penting seiring organisasi berpindah dari prototipe AI ke sistem operasional.

---

## Apa yang Kami Rekomendasikan?

Rekomendasi kami sederhana:

> **Bangun knowledge system terlebih dahulu. Tambahkan RAG ketika produk benar-benar membutuhkan jawaban yang dihasilkan AI.**

Mulai dengan:

1. Structured knowledge
2. Metadata yang jelas
3. Permissions
4. Search
5. Real user queries
6. Evaluasi retrieval

Kemudian tanyakan: **Apakah user menemukan apa yang mereka butuhkan?**

Jika ya, Anda mungkin belum membutuhkan RAG.

Jika tidak, tentukan mengapa.

Apakah karena:

- Content yang buruk?
- Indexing yang buruk?
- Retrieval yang buruk?
- Information architecture yang buruk?
- Atau user benar-benar membutuhkan sintesis jawaban?

Hanya masalah terakhir yang secara langsung mengarah ke RAG.

---

## Conclusion

RAG itu powerful, tetapi bukan definisi dari AI knowledge system.

Search membantu user **menemukan knowledge**.

RAG membantu aplikasi **menggunakan knowledge yang di-retrieve untuk menghasilkan jawaban**.

Keduanya bisa berdampingan.

Architecture terbaik bergantung pada task user yang sebenarnya.

Progression yang praktis:

\`\`\`mermaid
flowchart TD
    A[Structured Knowledge] --> B[Search]
    B --> C[Evaluate]
    C --> D["Semantic / Hybrid Retrieval"]
    D --> E[Add RAG When Needed]
\`\`\`

Tujuannya bukan membangun AI architecture yang paling canggih.

Tujuannya adalah membangun architecture paling sederhana yang memberikan user akses terpercaya ke knowledge yang mereka butuhkan.

> **Jangan bangun RAG karena bisa. Bangun ketika generated answers menyelesaikan masalah yang tidak bisa diselesaikan oleh search saja.**
`;
