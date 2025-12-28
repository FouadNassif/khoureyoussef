import navTranslations from './nav.json';

import footerTranslations from './footer.json';
import storyTranslations from './story';
import miraclesTranslations from './miracles';
import newsTranslations from './news';

export default {
    translation: {
        ...navTranslations,
        ...footerTranslations,
        hero: {
            title: "Khoury Youssef Abi Maroun",
            subtitle: "Known as Saint Youssef",
            description: "Discover the life of Khoury Youssef Abi Maroun, known as Saint Youssef, his deep faith, the miracles associated with his intercession, and the spiritual legacy that lives on today.",
            readMore: "Read His Story",
        },
        home: {
            latestMiracle: "Latest Miracle",
            featuredMiracleTitle: "Testimony of Faith",
            miracleDate: "December 2024",
            miracleHeading: "Miraculous Healing Through Prayer",
            miracleDescription: "A faithful pilgrim was completely healed from a serious illness after praying at Khoury Youssef's shrine. Doctors confirmed the recovery was medically unexplainable, attributing it to divine intervention through the saint's intercession.",
            readFullStory: "Read Full Story",
            showLess: "Show Less",
            visitSaint: "Visit the Saint",
            visitDescription: "The shrine of Khoury Youssef Abi Maroun, known as Saint Youssef, in Sereel has been a sanctuary of faith for generations. Experience the spiritual atmosphere, witness the devotion, and draw closer to God through the intercession of this blessed priest.",
            planVisit: "Plan Your Visit",
            aboutBadge: "Sacred Legacy",
            aboutTitle: "A Life of Divine Grace",
            aboutDescription1: "Khoury Youssef Abi Maroun, known as Saint Youssef, lived a life characterized by piety, patience, and perseverance in prayer, leaving a deep spiritual impact on his village and its people.",
            discoverStory: "Discover His Story",
            miraclesBadge: "Divine Interventions",
            churchBadge: "Sacred Place"
        },
        story: storyTranslations.story,
        ...miraclesTranslations,
        ...newsTranslations,
        miracles: {
            title: "Divine Miracles",
            subtitle: "Testimonies of Faith and Grace",
            healing: "Healing Miracles",
            healingDesc: "Countless testimonies of physical and spiritual healing through the saint's intercession.",
            prayers: "Answered Prayers",
            prayersDesc: "Faithful from across the region share stories of answered prayers through Khoury Youssef.",
            records: "Historical Records",
            recordsDesc: "Documented miracles spanning centuries, preserved in church archives and testimonies.",
            viewAll: "View All Miracles"
        },
        gallery: {
            title: "Sacred Gallery",
            subtitle: "Icons, Church, and Village",
            categories: {
                all: "All",
                bishop: "Bishop",
                sereel: "Sereel",
                church: "Church",
                icon: "Icons"
            }
        },
        contact: {
            title: "Connect With Us",
            subtitle: "Visit the shrine and follow our journey",
            mapTitle: "Location Map",
            followUs: "Follow Us",
            location: "Church Location",
            address: "Address",
            addressLine1: "Church of Khoury Youssef",
            addressLine2: "Sereel Village - Zgharta",
            addressLine3: "Lebanon",
            serviceTimes: "Service Times",
            serviceSunday: "Sunday: 10:00 AM",
            serviceWeekdays: "Weekdays: 6:00 PM",
            serviceFeast: "Feast Day: Special Services",
            contactLabel: "Contact",
            contactName: "Maria Sassine",
            contactPhone: "+961 71 797 415"
        },
        news: {
            title: "Latest News",
            subtitle: "Stay updated with our community events",
            readMore: "Read More",
            viewAll: "View All News",
            badge: "Latest Updates",
            items: {
                item1: {
                    title: "Bishop Youssef Suwaif on the Committee",
                    content: "His Eminence Bishop Youssef Suwaif speaks about the committee..."
                },
                item2: {
                    title: "Sermon by Bishop Youssef Suwaif",
                    content: "From the sermon of His Eminence Bishop Youssef Suwaif..."
                },
                item3: {
                    title: "Fairuz at Khoury Youssef Church",
                    content: ""
                },
                item4: {
                    title: "Hymn",
                    content: ""
                }
            }
        }
    }
};
