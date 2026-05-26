# 🚀 BU PROJE — Tatil Masraf

## Amaç

Tatilde yapılan harcamaları hızlıca kaydedip "kim ne harcadı"yı görmek için iPhone 14 Pro'da çalışan tek-dosyalık PWA. Backend yok, build adımı yok — `index.html`'i telefonda aç, çalışır.

## Proje Türü

**Tek-dosya PWA.** Tüm uygulama (HTML + CSS + JS + manifest + service worker) `index.html` içinde. LocalStorage ile kalıcılık.

## Stack

- **Vanilla HTML / CSS / JavaScript** — framework yok, build yok, npm yok
- **LocalStorage** — `tatil_trips`, `tatil_expenses`, `tatil_active_trip`
- **PWA** — inline manifest (blob URL) + inline service worker
- **Tabler Icons** — webfont CDN (`@tabler/icons-webfont`)
- **CSS Variables** — tek tema, custom property tabanlı

## Dosya Yapısı

```
.
├── index.html      ← TÜM uygulama burada (style + body + manifest + script)
├── CLAUDE.md       ← Bu dosya
└── .git/
```

Başka dosya **eklenmez**. Yeni feature → mevcut `index.html` içinde büyür.

## Komutlar

```bash
# Geliştirme
# Tarayıcıda dosyayı aç: file:///c:/dev/tatil-harcamalari/index.html
# veya hızlı statik sunucu (SW testi için):
npx serve .                    # http://localhost:3000

# Cihaza taşıma
# AirDrop / Drive / mail ile index.html'i telefona gönder, Safari'de aç,
# Paylaş → "Ana Ekrana Ekle"
```

## Veri Modeli

```ts
type Trip = {
  id: string;
  name: string;
  currency: 'NOK' | 'EUR' | 'USD' | 'TRY';
  createdAt: string;          // ISO
  people: string[];
};

type Expense = {
  id: string;
  tripId: string;
  person: string;
  category: 'food' | 'transport' | 'entertainment' | 'other';
  amount: number;             // tatil para biriminde
  note: string;
  createdAt: string;          // ISO
};
```

## Özel Kurallar

### 1. Tek-dosya zorunluluğu
Her şey `index.html` içinde. External script/style dosyası YOK. CDN tek istisna (Tabler Icons webfont).

### 2. Bağımlılık yok
npm/yarn/pnpm yok. `node_modules/` yok. `package.json` yok. Yeni kütüphane ihtiyacı doğarsa: ya inline yaz ya CDN'den çek ya da vazgeç.

### 3. iPhone 14 Pro hedefi
- Viewport: `width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no`
- Safe area: `env(safe-area-inset-bottom)` — tab bar ve kaydet butonunda
- Dokunma hedefleri: **min 44×44px** (Apple HIG)
- `-webkit-tap-highlight-color: transparent`
- Custom numpad — iOS native klavye **açılmaz**

### 4. Kapsam dışı (v1)
Kur dönüşümü, hesaplaşma algoritması ("kim kime borçlu"), grafik, fotoğraf ekleme, push notification, çoklu cihaz sync, auth. V2 konusu.

### 5. Swipe-to-delete
Konfirmasyon dialogu YOK. Sola swipe → siler → 3 saniyelik undo toast.

### 6. Yan Etki Yasası (Global Anayasa 1. Madde)
Düzeltme/değişiklik yaparken başka hiçbir yer negatif etkilenmemeli. Etkilenecek bir yer varsa: (1) etki listesini sun, (2) onay al, (3) sonra uygula.

## Ekran Haritası

```
TripList         ← aktif tatil yoksa otomatik açılır
  └─ Yeni tatil modal
ExpenseEntry     ← aktif tatil varsa varsayılan
  ├─ Kişi chip'leri (yatay scroll, tek seçim, son seçilen kalır)
  ├─ Kategori grid (2×2, ikon, amber vurgusu, varsayılan: food)
  ├─ Custom numpad (3×4, virgül ile 2 ondalık)
  └─ Kaydet (500ms yeşil flash)
Summary
  ├─ Stat kartlar (toplam + kişi başı)
  ├─ Kişiye göre dağılım (azalan)
  └─ Son harcamalar (en yeni 20, swipe-to-delete)
```

Tab bar: `[+ Ekle] [≡ Özet]`. Header: tatil adı + ⋯ menüsü (tatil değiştir / ayarlar / CSV export / tatili sil).

## Kategoriler & Para Birimleri

| Kategori | İkon |
|---|---|
| food | `ti-tools-kitchen-2` |
| transport | `ti-car` |
| entertainment | `ti-glass` |
| other | `ti-dots` |

| Para Birimi | Sembol |
|---|---|
| NOK | kr |
| EUR | € |
| USD | $ |
| TRY | ₺ |

## UX Kalite Kuralları (Katman 1 — Her Zaman)

Tek-dosya / vanilla bağlamında sadeleştirilmiş hali:

- Async işlem (CSV export, vb.) için durum göstergesi
- Hata durumlarında kullanıcıya anlaşılır mesaj (alert/toast)
- Boş liste/tablo → açıklama + aksiyon butonu (örn. "Henüz harcama yok — ilk girişi yap")
- Her kullanıcı aksiyonu görsel geri bildirim verir (kaydet flash, swipe görseli, vb.)
- Geri alınamaz işlemler (tatili sil) → confirm dialog. Tek harcama silme istisnası → undo toast.
- Form alanları validasyonu: kaydet butonu disabled, sebep gösterilir (toast/inline)
- Tüm sayfa "kim bunu neden kullanır?" sorusuna net cevap verir
