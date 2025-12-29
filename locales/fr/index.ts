import navTranslations from './nav.json';
import footerTranslations from './footer.json';
import storyTranslations from './story';
import miraclesTranslations from './miracles';
import newsTranslations from './news';

export default {
    translation: {
        ...navTranslations,
        hero: {
            title: "Khoury Youssef Abi Maroun Maatouk",
            subtitle: "Gardien de notre village, connu sous le nom de Saint Youssef",
            description: "Découvrez la vie de Khoury Youssef Abi Maroun Maatouk, connu sous le nom de Saint Youssef, sa foi profonde, les miracles associés à son intercession et l'héritage spirituel qui perdure aujourd'hui.",
            readMore: "Lire Son Histoire",
        },
        home: {
            latestMiracle: "Dernier Miracle",
            featuredMiracleTitle: "Témoignage de Foi",
            miracleDate: "Décembre 2024",
            miracleHeading: "Guérison Miraculeuse par la Prière",
            miracleDescription: "Un pèlerin fidèle a été complètement guéri d'une maladie grave après avoir prié au sanctuaire de Khoury Youssef. Les médecins ont confirmé que la guérison était médicalement inexplicable, l'attribuant à une intervention divine par l'intercession du saint prêtre.",
            readFullStory: "Lire l'Histoire Complète",
            showLess: "Afficher Moins",
            visitSaint: "Visiter Khoury Youssef",
            visitDescription: "Le sanctuaire de Khoury Youssef Abi Maroun Maatouk, connu sous le nom de Saint Youssef, à Sereel est un refuge de foi depuis des générations. Vivez l'atmosphère spirituelle, témoignez de la dévotion et rapprochez-vous de Dieu par l'intercession de ce prêtre béni.",
            planVisit: "Planifier Votre Visite",
            aboutBadge: "Héritage Sacré",
            aboutTitle: "Une Vie de Grâce Divine",
            aboutDescription1: "Khoury Youssef Abi Maroun Maatouk, connu sous le nom de Saint Youssef, a vécu une vie caractérisée par la piété, la patience et la persévérance dans la prière, laissant un impact spirituel profond sur son village et ses habitants.",
            discoverStory: "Découvrir Son Histoire",
            miraclesBadge: "Interventions Divines",
            churchBadge: "Lieu Sacré"
        },
        story: storyTranslations.story,
        ...miraclesTranslations,
        ...newsTranslations,
        miracles: {
            title: "Miracles Divins",
            subtitle: "Témoignages de Foi et de Grâce",
            healing: "Miracles de Guérison",
            healingDesc: "D'innombrables témoignages de guérison physique et spirituelle par l'intercession du saint.",
            prayers: "Prières Exaucées",
            prayersDesc: "Des fidèles de toute la région partagent des histoires de prières exaucées grâce à Khoury Youssef.",
            records: "Archives Historiques",
            recordsDesc: "Des miracles documentés sur des siècles, conservés dans les archives de l'église et les témoignages.",
            viewAll: "Voir Tous les Miracles"
        },
        gallery: {
            title: "Galerie Sacrée",
            subtitle: "Icônes, Église et Village",
            categories: {
                all: "Tout",
                bishop: "Évêque",
                sereel: "Sereel",
                church: "Église",
                icon: "Icônes"
            }
        },
        contact: {
            title: "Contactez-Nous",
            subtitle: "Visitez le sanctuaire et suivez notre parcours",
            mapTitle: "Carte de Localisation",
            followUs: "Suivez-Nous",
            location: "Lieu de l'Église",
            address: "Adresse",
            addressLine1: "Église de Khoury Youssef",
            addressLine2: "Village de Sereel - Zgharta",
            addressLine3: "Liban",
            serviceTimes: "Heures de Service",
            serviceSunday: "Dimanche: 10h00",
            serviceWeekdays: "Jours de semaine: 18h00",
            serviceFeast: "Jour de Fête: Services Spéciaux",
            contactLabel: "Contact",
            contactNam1: "Tony Sassine",
            contactPhone1: "+961 76 740 377",
            contactName2: "Maria Sassine",
            contactPhone2: "+961 71 797 415",
        },
        news: {
            title: "Dernières Nouvelles",
            subtitle: "Restez informé des événements de notre communauté et de nos annonces",
            readMore: "Lire Plus",
            viewAll: "Voir Toutes les Nouvelles",
            badge: "Dernières Mises à Jour",
            items: {
                item1: {
                    title: "L'Évêque Youssef Suwaif sur le Comité",
                    content: "Son Éminence l'Évêque Youssef Suwaif parle du comité formé pour étudier le dossier de Khoury Youssef Abi Maroun Maatouk. Siège d'été de l'Archidiocèse à Karm Saddeh le 1-1-2023"
                },
                item2: {
                    title: "Sermon de l'Évêque Youssef Suwaif",
                    content: "Du sermon de Son Éminence l'Évêque Youssef Suwaif sur Khoury Youssef Abi Maroun Maatouk lors de la fête de Khoury Youssef le 8-11-2022 à l'église Khoury Youssef à Sereel"
                },
                item3: {
                    title: "Fairuz à l'église Khoury Youssef à Sereel",
                    content: ""
                },
                item4: {
                    title: "Hymne",
                    content: ""
                }
            }
        },
        ...footerTranslations
    }
};

