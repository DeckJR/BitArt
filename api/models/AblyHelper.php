<?php
class AblyHelper
{
    private static $apiKey = 'aG8zWA.3gGe8g:uKHtupo_4eo5kZVqTrpcfroQM4pV6giHJo6XBDWLugw';

    public static function publicar(string $canal, string $evento, array $data): void
    {
        $url = "https://rest.ably.io/channels/" . urlencode($canal) . "/messages";

        $payload = json_encode([
            'name' => $evento,
            'data' => $data
        ]);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => $payload,
            CURLOPT_USERPWD        => self::$apiKey,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'Accept: application/json'
            ],
        ]);

        curl_exec($ch);
        curl_close($ch);
    }

    // Milisegundos actuales del servidor
    public static function ahora(): int
    {
        return (int)round(microtime(true) * 1000);
    }
}