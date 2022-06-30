import env from '../../../env';

const request = require('request');

const { DATAJEGER_EMAIL_ADDRESS, FDK_MAIL_SERVICE_ENDPOINT, FDK_MAIL_SERVICE_API_KEY } = env.clientEnv;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json();
        return
    }

    let mail = {
        from: DATAJEGER_EMAIL_ADDRESS,
        to: req.body.email,
        subject: "Takk for din forespørsel til Datajegeren",
        body: `Når en av våre datajegere starter søket etter datasettet du ønsker tilgang på, får du en epost fra oss. I perioder med stor pågang kan det ta lenger tid før du hører fra oss igjen.
Å finne datasett er ofte en manuell prosess. I juni og juli vil mange dataeiere være på sommerferie, og du vil derfor sannsynligvis ikke høre fra oss før august.
Vi gjør vårt ytterste for å hjelpe deg, men vi kan ikke garantere vi finner dataene du ønsker. Vi har heller ikke kontroll på datakvaliteten på det forespurte datasettet.
Under er kopi av forespørselen din. Dersom du har ytterligere informasjon å legge til, er det bare å svare på denne e-posten.

Med vennlig hilsen
Datafabrikken`,
    };

    request(
        {
            method: "POST",
            uri: FDK_MAIL_SERVICE_ENDPOINT,
            headers: {
                "X-API-TOKEN": FDK_MAIL_SERVICE_API_KEY
            },
            json: mail,
        },
        (error, response, body) => res.status(response.statusCode).json()
    );
}
