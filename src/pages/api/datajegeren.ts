import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import escape from 'lodash/escape';

import env from '../../../env';

const {
  DATAJEGER_EMAIL_ADDRESS,
  FDK_MAIL_SERVICE_ENDPOINT,
  FDK_MAIL_SERVICE_API_KEY
} = env.clientEnv;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({});
    return;
  }

  const {
    dataset,
    efforts,
    location,
    useCase,
    name,
    email,
    phoneNumber,
    organizationNumber
  } = req.body;

  const mail = {
    from: DATAJEGER_EMAIL_ADDRESS,
    to: req.body.email,
    bcc: DATAJEGER_EMAIL_ADDRESS,
    subject: 'Takk for din forespørsel til Datajegeren',
    body: `Når en av våre datajegere starter søket etter datasettet du ønsker tilgang på, får du en epost fra oss. I perioder med stor pågang kan det ta lenger tid før du hører fra oss igjen.

Vi gjør vårt ytterste for å hjelpe deg, men vi kan ikke garantere vi finner dataene du ønsker. Vi har heller ikke kontroll på datakvaliteten på det forespurte datasettet.

Under er kopi av forespørselen din. Dersom du har ytterligere informasjon å legge til, er det bare å svare på denne e-posten.

Med vennlig hilsen
Datafabrikken


Hvilket datasett trenger du?
${escape(dataset)}

Vet du hvor datasettet befinner seg?
${escape(location)}

Har du forsøkt å få tak i dette datasettet selv?
${escape(efforts)}

Hva skal datasettet brukes til?
${escape(useCase)}

Ditt navn
${escape(name)}

E-postadresse
${escape(email)}

Telefonnummer
${escape(phoneNumber)}

Organisasjonsnummer
${escape(organizationNumber)}
`
  };

  try {
    await axios({
      url: FDK_MAIL_SERVICE_ENDPOINT,
      headers: {
        'X-API-KEY': FDK_MAIL_SERVICE_API_KEY
      },
      method: 'POST',
      data: mail
    });

    return res.status(200).json({});
  } catch (e) {
    console.log(e);
    return res.status(400).json({});
  }
}
