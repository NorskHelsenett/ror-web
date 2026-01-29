import { ProjectListSchema } from '@ror/js-api-client'

const projects: ProjectListSchema = {
  data: [
    {
      active: true,
      created: '2023-03-09T11:14:48.541Z',
      description: 'Overbygg for alle clustre tilhørende SFM.\n',
      id: '6409bfa851b41fa8a07cb96d',
      name: 'Sentral Forskrivingsmodul',
      projectMetadata: {
        billing: {
          workorder: '10001835',
        },
        roles: [
          {
            contactInfo: {
              email: 'Hans.Christian.Alnaes@nhn.no',
              phone: '90852256',
              upn: 'Hans.Christian.Alnaes@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'hallvard.vasstveit@nhn.no',
              phone: '99550427',
              upn: 'hallvard.vasstveit@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          SFM: '',
        },
      },
      updated: '2025-06-04T06:51:30.873Z',
    },
    {
      active: true,
      created: '2023-03-09T11:24:28.447Z',
      description: 'NHNs verktøy for å administrere alle K8s clustre\nRelease, Operate and Report\nURL: ror.nhn.no',
      id: '6409c1ec068ef078d52cff13',
      name: 'ROR By NHN',
      projectMetadata: {
        billing: {
          workorder: 'Intern',
        },
        roles: [
          {
            contactInfo: {
              email: 'sindre.solem@drift.nhn.no',
              phone: '12345678',
              upn: 'sindre.solem@drift.nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'havarde@drift.nhn.no',
              phone: '12345678',
              upn: 'havarde@drift.nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          ROR: '',
        },
      },
      updated: '2025-05-14T08:29:39.89Z',
    },
    {
      active: true,
      created: '2023-03-09T11:39:44.431Z',
      description: 'Alle clustre tilhørende AMK-tjenesten',
      id: '6409c58051b41fa8a07e233f',
      name: 'AMK',
      projectMetadata: {
        billing: {
          workorder: '10001854',
        },
        roles: [
          {
            contactInfo: {
              email: 'drift-amk@nhn.no',
              phone: '12345678',
              upn: 'drift-amk@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'drift-amk@nhn.no',
              phone: '12345678',
              upn: 'drift-amk@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          AMK: '',
        },
      },
      updated: '2025-09-04T10:17:08.579Z',
    },
    {
      active: true,
      created: '2023-03-14T08:25:52.04Z',
      description:
        'Team Autentisering og Autorisasjon i Helsepersonell. Leverer HelseID, en felles påloggingstjeneste for helsesektoren. ',
      id: '64102f9000b32a00ff64c2d1',
      name: 'Helsepersonell - Auth og auth',
      projectMetadata: {
        billing: {
          workorder: '10000764',
        },
        roles: [
          {
            contactInfo: {
              email: 'Anette.Juliussen@nhn.no',
              phone: '1',
              upn: 'Anette.Juliussen@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'Ragnhild.Varmedal@nhn.no',
              phone: '1',
              upn: 'Ragnhild.Varmedal@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          SHP: '',
        },
      },
      updated: '2024-02-19T12:58:23.288Z',
    },
    {
      active: true,
      created: '2023-03-14T08:28:14.84Z',
      description:
        'Fellestjenester for Helsepersonell\n14des2023. AO endret fra 10001236 til 10001338 grunnet stengt AO i Agresso\n28.05.2024: AO endret fra 10001338 til 10001413 etter føring fra regnskap',
      id: '6410301e51d4a424d2474f1e',
      name: 'Helsepersonell - Felles',
      projectMetadata: {
        billing: {
          workorder: '10001413',
        },
        roles: [
          {
            contactInfo: {
              email: 'sigurd.ringbakken@nhn.no',
              phone: '1',
              upn: 'sigurd.ringbakken@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'sigurd.ringbakken@nhn.no',
              phone: '1',
              upn: 'sigurd.ringbakken@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          SHP: '',
        },
      },
      updated: '2024-05-28T07:15:41.111Z',
    },
    {
      active: true,
      created: '2023-03-14T08:31:27.323Z',
      description:
        'SHP-NAV er et sentralt lager for helsedata og hendelser i SHP, i første omgang benyttet for prøvesvar fra LAB og Røntgen fra alle laboratorier og bildediagnostikkere i hele Norge.',
      id: '641030df00b32a00ff652a4b',
      name: 'Helsepersonell - NAV',
      projectMetadata: {
        billing: {
          workorder: '10000975',
        },
        roles: [
          {
            contactInfo: {
              email: 'Ketil.Parow@nhn.no',
              phone: '12345678',
              upn: 'Ketil.Parow@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'Ketil.Parow@nhn.no',
              phone: '12345678',
              upn: 'Ketil.Parow@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          Kafka: '',
          NAV: '',
          SHP: '',
        },
      },
      updated: '2025-06-11T12:59:02.621Z',
    },
    {
      active: true,
      created: '2023-03-14T08:50:07.769Z',
      description:
        'Team Nilar skal motta hendelser relatert til, prosessere, lagre og tilgjengeliggjøre medisinske prøvesvar og svarrapporter fra alle norske laboratorier. Hendelser mottas fra Samhandlingsplattformens meldingsnav. Data tilgjengeliggjøres via et API.\n\nAO endret fra 10000982 til 1001462 22.01.2024',
      id: '6410353f00b32a00ff6649d6',
      name: 'Helsepersonell - Pasientens prøvesvar',
      projectMetadata: {
        billing: {
          workorder: '10001462',
        },
        roles: [
          {
            contactInfo: {
              email: 'oyvind.kvennas@nhn.no',
              phone: '',
              upn: 'oyvind.kvennas@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'Marianne.Zahl@nhn.no',
              phone: '',
              upn: 'Marianne.Zahl@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          Nilar: '',
          SHP: '',
          prøvesvar: '',
        },
      },
      updated: '2024-01-22T10:03:16.468Z',
    },
    {
      active: true,
      created: '2023-03-14T08:53:16.449Z',
      description:
        'Samle, produsere, berike og tilgjengeliggjøre informasjon, ikke helsedata, om alle personer som helsesektoren potensielt kan ha et forhold til.',
      id: '641035fc00b32a00ff66727e',
      name: 'Helsepersonell - Persontjenesten',
      projectMetadata: {
        billing: {
          workorder: '10000749',
        },
        roles: [
          {
            contactInfo: {
              email: 'hanne.mari.kjaerem.hindklev@nhn.no',
              phone: '',
              upn: 'hanne.mari.kjaerem.hindklev@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'hanne.mari.kjaerem.hindklev@nhn.no',
              phone: '',
              upn: 'hanne.mari.kjaerem.hindklev@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          Person: '',
          Persontjenesten: '',
          SHP: '',
        },
      },
      updated: '2023-10-24T08:58:10.815Z',
    },
    {
      active: true,
      created: '2023-03-14T08:55:25.98Z',
      description:
        'Utvikle og forvalte samhandlingsmekanismer i NHN, med mål om å realisere en generisk infrastruktur, meldingstjener, EDI, AMQP, for samhandling og meldingsutveksling for sektoren.',
      id: '6410367d00b32a00ff668d9a',
      name: 'Helsepersonell - Melding',
      projectMetadata: {
        billing: {
          workorder: '10000977',
        },
        roles: [
          {
            contactInfo: {
              email: 'ketil.parow@nhn.no',
              phone: '90030509',
              upn: 'ketil.parow@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'team-melding@nhn.no',
              phone: '12346578',
              upn: 'team-melding@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          Melding: '',
          SHP: '',
        },
      },
      updated: '2025-08-22T11:03:35.034Z',
    },
    {
      active: true,
      created: '2023-03-14T08:57:49.59Z',
      description:
        'Team plattform skal støtte de andre teamene i å få tjenester til å kjøre på Kubernetes-plattformen i privat sky\n\nAO endret fra 10001236 til 10001476. Etter mail fra Øyvind Kvennås, via Petter H. 05.03.24\n\nAO endret fra 10001476 til 10001409 23.01.2025',
      id: '6410370d00b32a00ff66b9f1',
      name: 'Helsepersonell - Plattform',
      projectMetadata: {
        billing: {
          workorder: '10001409',
        },
        roles: [
          {
            contactInfo: {
              email: 'ketil.parow@nhn.no',
              phone: '1',
              upn: 'ketil.parow@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'ketil.parow@nhn.no',
              phone: '1',
              upn: 'ketil.parow@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          Plattform: '',
          SHP: '',
        },
      },
      updated: '2025-01-23T13:06:07.35Z',
    },
    {
      active: true,
      created: '2023-03-15T12:23:46.197Z',
      description: 'test',
      id: '6411b8d21c9f4ec77f5a19f5',
      name: 'JRA-TEST',
      projectMetadata: {
        billing: {
          workorder: '54010-5',
        },
        roles: [
          {
            contactInfo: {
              email: 'jon.ramy.andersen@nhn.no',
              phone: '90560674',
              upn: 't1-jona@drift.nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'jon.ramy.andersen@nhn.no',
              phone: '90560674',
              upn: 't1-jona@drift.nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {},
      },
      updated: '2023-03-15T12:23:46.197Z',
    },
    {
      active: true,
      created: '2023-03-16T12:44:25.364Z',
      description:
        'Sette SHPs kunder i stand til å ta i bruk tjenestene vi tilbyr uten menneskelig interaksjon.\nDriftspersoner: Morten Holje og Magnus Bjerke Vik.',
      id: '64130f29db841efdbd18d655',
      name: 'Helsepersonell - Selvbetjening',
      projectMetadata: {
        billing: {
          workorder: '10000775',
        },
        roles: [
          {
            contactInfo: {
              email: 'Ragnhild.Varmedal@nhn.no',
              phone: '123',
              upn: 'Ragnhild.Varmedal@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'Anette.Juliussen@nhn.no',
              phone: '123',
              upn: 'Anette.Juliussen@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          SHP: '',
          Selvbetjening: '',
        },
      },
      updated: '2025-03-21T11:34:37.071Z',
    },
    {
      active: true,
      created: '2023-03-16T12:53:11.544Z',
      description:
        'Team PTS (personvern og tilgangstyring) skal motta hendelser relatert til, prosessere, lagre og tilgjengeliggjøre personverninnstillinger og tilgangsstyring  fra EPJ-systemer, kjernejournal og PVK. Hendelser mottas via PTS-API og lagres i  Samhandlingsplattformens meldingsnav. Data tilgjengeliggjøres via et API.\n\nAO endret fra 10001105 til 10001462 20.03.2024. Etter mail fra Øyvind Kvennås, via Petter H. 05.03.24',
      id: '6413113732946e085f739f5b',
      name: 'Helsepersonell - Personvern og Tilgangsstyring',
      projectMetadata: {
        billing: {
          workorder: '10001462',
        },
        roles: [
          {
            contactInfo: {
              email: 'Hanne.Mari.Kjaerem.Hindklev@nhn.no',
              phone: '1',
              upn: 'Hanne.Mari.Kjaerem.Hindklev@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'mail@nhn.no',
              phone: '1',
              upn: 'mail@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          PTS: '',
          SHP: '',
        },
      },
      updated: '2024-03-20T08:40:38.072Z',
    },
    {
      active: true,
      created: '2023-03-16T12:56:36.399Z',
      description:
        'NHNs verktøykasse for å sikre effektiv og forsvarlig drift av alle K8s clustre. Tilbyr mange verktøy til konsumenter',
      id: '6413120456adf09873dba489',
      name: 'NHN Tooling',
      projectMetadata: {
        billing: {
          workorder: 'Internal',
        },
        roles: [
          {
            contactInfo: {
              email: 'havard.elnan@nhn.no',
              phone: '',
              upn: 'havard.elnan@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'havard.elnan@nhn.no',
              phone: '',
              upn: 'havard.elnan@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          Tooling: '',
        },
      },
      updated: '2023-03-16T12:56:36.399Z',
    },
    {
      active: true,
      created: '2023-03-16T19:40:43.931Z',
      description: 'Prosjekt for alle clustre tilhørende Kjernejournal',
      id: '641370bb94b30b93a1f95b45',
      name: 'Kjernejournal',
      projectMetadata: {
        billing: {
          workorder: '10001832',
        },
        roles: [
          {
            contactInfo: {
              email: 'kristin.ronneberg@nhn.no',
              phone: '48300845',
              upn: 'kristin.ronneberg@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'kjernejournalvakt@kundesenter.nhn.no',
              phone: '12345678',
              upn: 'kjernejournalvakt@kundesenter.nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          Kjernejournal: '',
        },
      },
      updated: '2025-06-03T05:54:52.384Z',
    },
    {
      active: true,
      created: '2023-03-16T19:48:09.013Z',
      description:
        'Samleprosjekt for ulike test- og utviklingsmiljø for Containerplattform / NHN Privat Sky. Ingen kostnadsføring på disse inntil videre.',
      id: '64137279ac1734374ab1dc81',
      name: 'Containerplattform',
      projectMetadata: {
        billing: {
          workorder: 'Intern',
        },
        roles: [
          {
            contactInfo: {
              email: 'sindre.solem@nhn.no',
              phone: '123',
              upn: 'sindre.solem@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'havard.elnan@nhn.no',
              phone: '123',
              upn: 'havard.elnan@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          'Privat Sky': '',
        },
      },
      updated: '2025-08-27T08:24:33.746Z',
    },
    {
      active: true,
      created: '2023-03-16T20:02:16.421Z',
      description:
        'Datashield er et nettsted som brukes for å co-analysere data fra flere deltagende studier. Metoden bringer analysene til dataene, i stedet for å bringe dataene til analysen. Tjenesten inneholder data fra spørreundersøkelser tilknyttet (MoBA) Den norske mor og barn-undersøkelsen.',
      id: '641375c8ac1734374ab28fb1',
      name: 'Datashield',
      projectMetadata: {
        billing: {
          workorder: '310206000',
        },
        roles: [
          {
            contactInfo: {
              email: 'kjetil.flataukan@nhn.no',
              phone: '',
              upn: 'kjetil.flataukan@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'kenneth.vanvik@nhn.no',
              phone: '',
              upn: 'kenneth.vanvik@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          Datashield: '',
        },
      },
      updated: '2023-03-31T12:34:26.027Z',
    },
    {
      active: true,
      created: '2023-03-16T20:07:18.104Z',
      description:
        'Den offentlige helseportalen helsenorge.no ble etablert i juni 2011. Formålet med portalen er å gi innbyggerne en enklere og helhetlig tilgang til helse- og omsorgstjenestene, sikre digitale tjenester og kvalitetssikret helseinformasjon på nett.',
      id: '641376f694b30b93a1faf4ca',
      name: 'Helsenorge',
      projectMetadata: {
        billing: {
          workorder: '10001850',
        },
        roles: [
          {
            contactInfo: {
              email: 'solveig.hartvig@nhn.no',
              phone: '92029262',
              upn: 'solveig.hartvig@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'alexander.luhr@nhn.no',
              phone: '95262295',
              upn: 'alexander.luhr@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          Helsenorge: '',
        },
      },
      updated: '2025-07-24T10:51:40.623Z',
    },
    {
      active: true,
      created: '2023-03-16T20:15:04.9Z',
      description:
        'Formålet med Grunndata (tidligere Registerplattformen) er å tilby en tjeneste for felles enhetlig drift av nasjonale register for helsesektoren. Tjenesten tilbyr et sett med registre som er i utstrakt bruk, og som kan anses å være kritisk for virksomheten i Norsk Helsenett SF.\n\nKoststed endret fra 10000402 til 10001192 16.05.2023\n\nKoststed endret fra 10001192 til 10001427 18.03.2024. ',
      id: '641378c8ac1734374ab3800a',
      name: 'Helsepersonell - Grunndata',
      projectMetadata: {
        billing: {
          workorder: '10001828',
        },
        roles: [
          {
            contactInfo: {
              email: 'Hanne.Mari.Kjaerem.Hindklev@nhn.no',
              phone: '1',
              upn: 'Hanne.Mari.Kjaerem.Hindklev@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'mail@nhn.no',
              phone: '1',
              upn: 'mail@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          Grunndata: '',
        },
      },
      updated: '2025-09-25T08:50:26.117Z',
    },
    {
      active: true,
      created: '2023-03-16T20:21:05.984Z',
      description: 'Tarmscreeningprogrammets administrasjonssystem (TAPAS)',
      id: '64137a31ac1734374ab3f469',
      name: 'Tarmscreening',
      projectMetadata: {
        billing: {
          workorder: '310212000',
        },
        roles: [
          {
            contactInfo: {
              email: 'Mikael.Helcl@nhn.no',
              phone: '',
              upn: 'Mikael.Helcl@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'borgar.foll.flytor@nhn.no',
              phone: '',
              upn: 'borgar.foll.flytor@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          TSC: '',
          Tarmscreening: '',
        },
      },
      updated: '2023-08-31T13:33:33.546Z',
    },
    {
      active: true,
      created: '2023-03-16T20:22:54.379Z',
      description: 'Windowsapplikasjoner ',
      id: '64137a9eac1734374ab41165',
      name: 'Windowsapplikasjoner',
      projectMetadata: {
        billing: {
          workorder: '61002-1',
        },
        roles: [
          {
            contactInfo: {
              email: 'audun.saltvik@nhn.no',
              phone: '73 56 54 31',
              upn: 'audun.saltvik@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'VARSEL-Windowsapplikasjoner@nhn.no',
              phone: 'VARSEL-Windowsapplikasjoner@nhn.no',
              upn: 'VARSEL-Windowsapplikasjoner@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          Winapp: '',
        },
      },
      updated: '2024-08-16T10:37:55.315Z',
    },
    {
      active: true,
      created: '2023-03-16T20:27:52.773Z',
      description: 'EU-prosjekt for utveksling av data',
      id: '64137bc894b30b93a1fbceba',
      name: 'Helsepersonell - NCPeH',
      projectMetadata: {
        billing: {
          workorder: '10001307',
        },
        roles: [
          {
            contactInfo: {
              email: 'Hanne.Mari.Kjaerem.Hindklev@nhn.no',
              phone: '1',
              upn: 'Hanne.Mari.Kjaerem.Hindklev@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'Anette.Juliussen@nhn.no',
              phone: '1',
              upn: 'Anette.Juliussen@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          ncpeh: '',
        },
      },
      updated: '2024-10-02T11:19:20.365Z',
    },
    {
      active: true,
      created: '2023-03-16T20:35:47.893Z',
      description: 'Nødvendige tjenester for management av privat sky',
      id: '64137da3ac1734374ab4c5c3',
      name: 'Management Privat Sky',
      projectMetadata: {
        billing: {
          workorder: 'Intern',
        },
        roles: [
          {
            contactInfo: {
              email: 'sindre.solem@nhn.no',
              phone: '93688700',
              upn: 'sindre.solem@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'havard.elnan@nhn.no',
              phone: '92671629',
              upn: 'havard.elnan@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          mgmt: '',
        },
      },
      updated: '2025-03-11T14:37:57.214Z',
    },
    {
      active: true,
      created: '2023-03-29T10:26:48.103Z',
      description: 'PMD - Pasientens MåleData',
      id: '64241268cc18fe8e78f0691a',
      name: 'Helsepersonell - Pasientens måledata',
      projectMetadata: {
        billing: {
          workorder: '10001338',
        },
        roles: [
          {
            contactInfo: {
              email: 'sigurd.ringbakken@nhn.no',
              phone: '92243734',
              upn: 'sigurd.ringbakken@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'sigurd.ringbakken@nhn.no',
              phone: '92243734',
              upn: 'sigurd.ringbakken@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {
          HP: '',
          PMD: '',
          SHP: '',
        },
      },
      updated: '2025-06-05T10:13:51.18Z',
    },
    {
      active: true,
      created: '2023-06-06T09:59:29.232Z',
      description:
        'Helsepersonell.\n\nAO endret fra 10001340 til 10001411 20.03.2024. Etter mail fra Øyvind Kvennås, via Petter H. 05.03.24',
      id: '647f03811106723d1aabee39',
      name: 'Helsepersonell - Innrapportering',
      projectMetadata: {
        billing: {
          workorder: '10001340',
        },
        roles: [
          {
            contactInfo: {
              email: 'Kari.Gjerde@nhn.no',
              phone: '12345678',
              upn: 'Kari.Gjerde@nhn.no',
            },
            roleDefinition: 'Owner',
          },
          {
            contactInfo: {
              email: 'ketil.parow@nhn.no',
              phone: '12345678',
              upn: 'ketil.parow@nhn.no',
            },
            roleDefinition: 'Responsible',
          },
        ],
        serviceTags: {},
      },
      updated: '2025-03-12T13:31:30.646Z',
    },
  ],
  dataCount: 25,
  offset: 0,
  totalCount: 77,
}

export default projects
