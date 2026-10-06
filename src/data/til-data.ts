export interface TilEntry {
  id: string;
  date: string; // YYYY-MM-DD
  category: "ai" | "web" | "security" | "db";
  categoryLabel: {
    id: string;
    en: string;
  };
  title: {
    id: string;
    en: string;
  };
  takeaway: {
    id: string;
    en: string;
  };
  whyItMatters: {
    id: string;
    en: string;
  };
  codeSnippet?: {
    language: string;
    fileName: string;
    code: string;
  };
  tags: string[];
}

export const TIL_CATEGORIES = [
  { key: "all", label: { id: "Semua Catatan", en: "All Notes" } },
  { key: "ai", label: { id: "Applied AI & CV", en: "Applied AI & CV" } },
  { key: "web", label: { id: "Web Architecture", en: "Web Architecture" } },
  {
    key: "security",
    label: { id: "Security & Linux", en: "Security & Linux" },
  },
  { key: "db", label: { id: "Database & Data", en: "Database & Data" } },
];

export const TIL_ENTRIES: TilEntry[] = [
  {
    id: "2026-10-06-api-idempotency-key",
    date: "2026-10-06",
    category: "web",
    categoryLabel: {
      id: "Web Architecture",
      en: "Web Architecture",
    },
    title: {
      id: "Pencegahan Duplikasi Transaksi dengan Pola Idempotency Key dan Atomic Lock Redis",
      en: "Preventing Duplicate API Operations using Idempotency Keys and Atomic Redis Locks",
    },
    takeaway: {
      id: "Menerapkan header Idempotency-Key dengan penguncian atomik Cache::lock() pada middleware backend menjamin request mutasi kritis (seperti penebusan kuota pupuk) hanya diproses tepat satu kali meskipun terjadi retry jaringan ganda.",
      en: "Enforcing an Idempotency-Key header coupled with Redis Cache::lock() in backend middleware ensures critical write operations are processed exactly once under network retry events.",
    },
    whyItMatters: {
      id: "Ketika koneksi internet di lapangan tidak stabil, pengguna cenderung menekan tombol konfirmasi berulang kali. Tanpa kunci idempoten, request ganda dapat memicu pemotongan saldo kuota atau entri transaksi duplikat.",
      en: "Under degraded field network connectivity, users frequently trigger repeated submissions. Idempotency guards critical state endpoints against double deduction anomalies.",
    },
    codeSnippet: {
      language: "php",
      fileName: "EnsureIdempotentRequest.php",
      code: `public function handle(Request $request, Closure $next)
{
    $idempotencyKey = $request->header('X-Idempotency-Key');
    if (!$idempotencyKey) {
        return $next($request);
    }

    $lockKey = 'idempotency:' . $idempotencyKey;
    
    // Kunci atomik selama 10 detik selama request diproses
    return Cache::lock($lockKey, 10)->get(function () use ($request, $next, $lockKey) {
        if ($cachedResponse = Cache::get($lockKey . ':response')) {
            return response()->json($cachedResponse['data'], $cachedResponse['status']);
        }

        $response = $next($request);
        Cache::put($lockKey . ':response', [
            'data' => json_decode($response->getContent(), true),
            'status' => $response->getStatusCode()
        ], now()->addHours(24));

        return $response;
    }) ?? response()->json(['error' => 'Conflict: Concurrent request in flight.'], 409);
}`,
    },
    tags: ["REST API", "Laravel", "Redis", "Concurrency", "Architecture"],
  },
  {
    id: "2026-10-05-pytorch-gradcam-visualization",
    date: "2026-10-05",
    category: "ai",
    categoryLabel: {
      id: "Applied AI",
      en: "Applied AI",
    },
    title: {
      id: "Visualisasi Keputusan CNN dengan Grad-CAM dan Hook Gradien PyTorch",
      en: "CNN Interpretability and Decision Visualization using Grad-CAM in PyTorch",
    },
    takeaway: {
      id: "Mengambil gradien dari layer konvolusi terakhir melalui register_full_backward_hook() menghasilkan peta aktivasi visual (heatmap) yang membuktikan bagian citra mana yang menjadi dasar prediksi model.",
      en: "Extracting gradients from the final convolutional layer using register_full_backward_hook() generates class activation heatmaps validating which spatial regions triggered model inference.",
    },
    whyItMatters: {
      id: "Pada klasifikasi citra medis seperti Alzheimer MRI dan patologi ikan nila, Grad-CAM memberikan bukti transparansi saintifik (Explainable AI) agar keputusan model dapat diverifikasi langsung oleh dokter dan praktisi tambak.",
      en: "In clinical imaging and aquaculture pathology, Grad-CAM provides Explainable AI (XAI) transparency, enabling domain experts to cross-verify neural activation regions against clinical symptoms.",
    },
    codeSnippet: {
      language: "python",
      fileName: "gradcam_visualizer.py",
      code: `import torch
import torch.nn.functional as F

# Pasang hook pada feature map layer konvolusi terakhir
gradients = []
def backward_hook(module, grad_input, grad_output):
    gradients.append(grad_output[0])

target_layer.register_full_backward_hook(backward_hook)
output = model(input_tensor)
score = output[0, predicted_class]
score.backward()

# Kalkulasi bobot pooled gradients dan relu activation
pooled_grads = torch.mean(gradients[0], dim=[0, 2, 3])
for i in range(activations.size(1)):
    activations[:, i, :, :] *= pooled_grads[i]
heatmap = torch.mean(activations, dim=1).squeeze()
heatmap = F.relu(heatmap)`,
    },
    tags: ["PyTorch", "Grad-CAM", "Explainable AI", "Computer Vision"],
  },
  {
    id: "2026-10-04-pytorch-amp-mixed-precision",
    date: "2026-10-04",
    category: "ai",
    categoryLabel: {
      id: "Applied AI",
      en: "Applied AI",
    },
    title: {
      id: "Akselerasi Pelatihan PyTorch dan Efisiensi VRAM dengan torch.cuda.amp",
      en: "Accelerating PyTorch Training and VRAM Efficiency using torch.cuda.amp",
    },
    takeaway: {
      id: "Kombinasi autocast() dan GradScaler() mengeksekusi operasi forward dan backward dalam presisi FP16 secara otomatis tanpa underflow gradien, memangkas konsumsi VRAM hingga 40-50 persen dan mempercepat proses training.",
      en: "Pairing autocast() with GradScaler() executes forward and backward operations in FP16 mixed precision without numerical underflow, reducing GPU VRAM allocation by 40-50 percent while accelerating training loops.",
    },
    whyItMatters: {
      id: "Pada model CNN seperti DenseNet-169 atau EfficientNet dengan batch size besar, FP16 mixed precision memungkinkan alokasi batch lebih optimal pada keterbatasan memori GPU tanpa mengorbankan akurasi konvergensi model.",
      en: "For deep networks such as DenseNet-169 or EfficientNet, mixed precision unlocks higher batch throughput on GPU memory constraints without compromising empirical convergence accuracy.",
    },
    codeSnippet: {
      language: "python",
      fileName: "mixed_precision_train.py",
      code: `import torch
from torch.amp import autocast, GradScaler

scaler = GradScaler("cuda")

for images, labels in train_loader:
    optimizer.zero_grad(set_to_none=True)

    # Eksekusi operasi konvolusi dalam presisi FP16 secara otomatis
    with autocast(device_type="cuda", dtype=torch.float16):
        outputs = model(images)
        loss = criterion(outputs, labels)

    # Skala loss untuk mencegah underflow gradien pada FP16
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()`,
    },
    tags: ["PyTorch", "Mixed Precision", "CUDA", "AMP", "Performance"],
  },
  {
    id: "2026-10-03-pytorch-pin-memory",
    date: "2026-10-03",
    category: "ai",
    categoryLabel: {
      id: "Applied AI",
      en: "Applied AI",
    },
    title: {
      id: "Optimasi Throughput GPU PyTorch dengan pin_memory dan non_blocking",
      en: "Optimizing PyTorch GPU Throughput with pin_memory and non_blocking",
    },
    takeaway: {
      id: "Mengaktifkan pin_memory=True pada DataLoader dan non_blocking=True saat memindahkan tensor ke CUDA memotong bottleneck latensi transfer host ke GPU secara signifikan.",
      en: "Enabling pin_memory=True in DataLoader alongside non_blocking=True during tensor CUDA dispatch significantly eliminates host-to-device memory transfer bottlenecks.",
    },
    whyItMatters: {
      id: "Pada pelatihan model citra medis beresolusi tinggi seperti DenseNet-169, waktu tunggu transfer data dari RAM ke VRAM sering kali menjadi penghambat utama utilisasi GPU.",
      en: "During high-resolution medical imaging training like DenseNet-169, data transfer stalls between system RAM and VRAM frequently bottleneck GPU compute saturation.",
    },
    codeSnippet: {
      language: "python",
      fileName: "dataset_loader.py",
      code: `train_loader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,
    pin_memory=True  # Alokasi page-locked host memory
)

for images, labels in train_loader:
    # Transfer asinkron tanpa memblokir CPU thread
    images = images.to(device, non_blocking=True)
    labels = labels.to(device, non_blocking=True)
    outputs = model(images)`,
    },
    tags: ["PyTorch", "CUDA", "Performance", "Computer Vision"],
  },
  {
    id: "2026-10-02-laravel-flask-microservice",
    date: "2026-10-02",
    category: "web",
    categoryLabel: {
      id: "Web Architecture",
      en: "Web Architecture",
    },
    title: {
      id: "Pola Komunikasi Asinkron Multipart Laravel HTTP Client ke Python AI Microservice",
      en: "Asynchronous Multipart Streaming Pattern from Laravel HTTP Client to Python AI Service",
    },
    takeaway: {
      id: "Mengirimkan stream file langsung via attach() pada Http::timeout() mencegah pembengkakan memori server Laravel saat meneruskan berkas citra berukuran besar ke engine inferensi Flask.",
      en: "Streaming files directly via attach() with explicit Http::timeout() avoids memory buffer bloat in Laravel when piping large image payloads to a Flask inference microservice.",
    },
    whyItMatters: {
      id: "Pemisahan arsitektur monolit web dengan container AI Python menjaga web portal tetap responsif melayani peternak tanpa terganggu komputasi forward pass model CNN.",
      en: "Decoupling the web application layer from the Python AI container keeps the user portal fully responsive while the CNN model executes heavy matrix multiplication.",
    },
    codeSnippet: {
      language: "php",
      fileName: "DiagnosisService.php",
      code: `$response = Http::timeout(30)
    ->attach(
        'image',
        file_get_contents($uploadedFile->getRealPath()),
        $fileName
    )
    ->post(config('services.ai.endpoint') . '/predict');

if ($response->successful()) {
    $prediction = $response->json();
    return $this->mapCurativeSop($prediction);
}`,
    },
    tags: ["Laravel 12", "Python Flask", "Microservices", "REST API"],
  },
  {
    id: "2026-09-30-iptables-rate-limiting",
    date: "2026-09-30",
    category: "security",
    categoryLabel: {
      id: "Security & Linux",
      en: "Security & Linux",
    },
    title: {
      id: "Mitigasi SYN Flood dan Koneksi Agresif Menggunakan Modul limit iptables",
      en: "SYN Flood and Aggressive Connection Mitigation Using iptables limit Module",
    },
    takeaway: {
      id: "Membatasi laju paket TCP SYN baru dengan modul hashlimit dan limit mencegah exhausted socket table pada server Linux sebelum paket diteruskan ke aplikasi web.",
      en: "Rate-limiting new TCP SYN packets using iptables limit and hashlimit modules prevents Linux socket table exhaustion before packets hit application worker threads.",
    },
    whyItMatters: {
      id: "Taktik pertahanan ini diterapkan saat memenangkan Juara 1 LAOS Arena 2024 untuk menjaga server tetap melayani traffic valid di tengah serangan DoS yang gencar.",
      en: "This defensive tactic was instrumental in securing 1st Place at LAOS Arena 2024, maintaining uptime for legitimate users during intensive simulated DoS floods.",
    },
    codeSnippet: {
      language: "bash",
      fileName: "server_hardening.sh",
      code: `# Batasi paket SYN masuk: maksimal 25/detik dengan toleransi burst 50
iptables -A INPUT -p tcp --syn -m limit --limit 25/s --limit-burst 50 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP

# Lindungi dari port scanner agresif
iptables -A INPUT -p tcp --tcp-flags ALL NONE -m limit --limit 5/m -j ACCEPT`,
    },
    tags: ["Linux", "iptables", "DDoS Mitigation", "LAOS Arena"],
  },
  {
    id: "2026-09-28-mysql-acid-transactions",
    date: "2026-09-28",
    category: "db",
    categoryLabel: {
      id: "Database",
      en: "Database",
    },
    title: {
      id: "Pencegahan Race Condition Penebusan Kuota Pupuk dengan SELECT FOR UPDATE",
      en: "Preventing Quota Redemption Race Conditions with SELECT FOR UPDATE",
    },
    takeaway: {
      id: "Menerapkan pesimistic locking (SELECT ... FOR UPDATE) di dalam blok transaksi InnoDB menjamin sisa kuota tidak dapat ditebus ganda saat terjadi klik bersamaan dari kios resmi.",
      en: "Applying pessimistic locking (SELECT ... FOR UPDATE) inside InnoDB transaction blocks guarantees fertilizer quota balances cannot be double-spent under concurrent cashier submissions.",
    },
    whyItMatters: {
      id: "Integritas data kuota bersubsidi pada sistem SiPuBi bersifat krusial untuk mencegah kerugian negara dan memastikan audit penyaluran komoditas 100% akurat.",
      en: "Subsidy quota integrity in the SiPuBi system is mission-critical to eliminate logistical fraud and guarantee 100% auditable commodity balances.",
    },
    codeSnippet: {
      language: "sql",
      fileName: "redeem_quota_transaction.sql",
      code: `START TRANSACTION;

-- Kunci baris kuota petani saat kalkulasi berlangsung
SELECT remaining_kg FROM farmer_quotas 
WHERE farmer_id = 1042 AND fertilizer_id = 3 
FOR UPDATE;

-- Update pengurangan hanya jika kuota mencukupi
UPDATE farmer_quotas 
SET remaining_kg = remaining_kg - 50 
WHERE farmer_id = 1042 AND fertilizer_id = 3 AND remaining_kg >= 50;

COMMIT;`,
    },
    tags: ["MySQL", "InnoDB", "Transactions", "ACID", "SiPuBi"],
  },
];
