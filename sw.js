// sw.js - Arka Plan İşçisi (Service Worker)

let testInterval = null;
let counter = 0;

const testMessages = [
    "Arka plan servis kontrolü stabil.",
    "Bildirim kuyruğu başarıyla işlendi.",
    "Zamanlayıcı senkronizasyonu aktif.",
    "Veri iletim testi gerçekleştiriliyor."
];

// Ön yüzden (HTML) gelen mesajları dinleme
self.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'startInterval') {
        
        // Mevcut bir döngü varsa temizle
        if (testInterval) clearInterval(testInterval);

        // Tarayıcı kısıtlamalarına takılmamak ve kararlı çıktı almak için 4 saniyelik periyot
        testInterval = setInterval(function() {
            counter++;
            const randomText = testMessages[Math.floor(Math.random() * testMessages.length)];

            const title = "Test Uyarısı #" + counter;
            const options = {
                body: randomText,
                // tag parametresi her bildirimin eskiyi ezmek yerine yeni bir kart açmasını sağlar
                tag: "system-test-id-" + counter,
                requireInteraction: false,
                silent: false
            };

            // Mobil tarayıcıların kabul ettiği standart bildirim tetikleme yöntemi
            self.registration.showNotification(title, options);

        }, 4000); // 4 saniye
    }
});
