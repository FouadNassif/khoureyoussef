import navTranslations from './nav.json';
import footerTranslations from './footer.json';
import storyTranslations from './story';
import miraclesTranslations from './miracles';
import newsTranslations from './news';

export default {
    translation: {
        ...navTranslations,
        hero: {
            title: "الخوري يوسف أبي مارون معتوق",
            subtitle: "المعروف بالقديس يوسف",
            description: "اكتشف حياة الخوري يوسف أبي مارون معتوق، المعروف بالقديس يوسف، وإيمانه العميق، والمعجزات المرتبطة بشفاعته، والإرث الروحي الذي ما زال حيًّا حتى اليوم.",
            readMore: "اقرأ قصته",
        },
        home: {
            latestMiracle: "أحدث معجزة",
            featuredMiracleTitle: "شهادة إيمان",
            miracleDate: "كانون الأول 2024",
            miracleHeading: "شفاء معجزي بالصلاة",
            miracleDescription: "حاج مؤمن شُفي تماماً من مرض خطير بعد الصلاة في مزار الخوري يوسف. أكد الأطباء أن الشفاء غير قابل للتفسير طبياً، ونسبوه إلى تدخل إلهي بشفاعة الكاهن القديس.",
            readFullStory: "اقرأ القصة الكاملة",
            showLess: "إظهار أقل",
            visitSaint: "زيارة الخوري يوسف",
            visitDescription: "مزار الخوري يوسف أبي مارون معتوق، المعروف بالقديس يوسف، في سرعل كان ملاذًا للإيمان عبر الأجيال. اختبر الأجواء الروحية، واشهد مظاهر التفاني، وتقرّب بالصلاة من الله بشفاعة هذا الكاهن المبارك.",
            planVisit: "خطط لزيارتك",
            aboutBadge: "إرث مقدس",
            aboutTitle: "حياة من النعمة الإلهية",
            aboutDescription1: "الخوري يوسف أبي مارون معتوق، المعروف بالقديس يوسف، عاش حياة تميّزت بالتقوى والصبر والمثابرة على الصلاة، تاركًا أثرًا روحيًا عميقًا في قريته وأبنائها.",
            discoverStory: "اكتشف قصته",
            miraclesBadge: "تدخلات إلهية",
            churchBadge: "مكان مقدس"
        },
        story: storyTranslations.story,
        ...miraclesTranslations,
        ...newsTranslations,
        miracles: {
            title: "المعجزات الإلهية",
            subtitle: "شهادات الإيمان والنعمة",
            healing: "معجزات الشفاء",
            healingDesc: "شهادات لا تحصى من الشفاء الجسدي والروحي بشفاعة القديس.",
            prayers: "صلوات مستجابة",
            prayersDesc: "المؤمنون من جميع أنحاء المنطقة يشاركون قصص الصلوات المستجابة بواسطة الخوري يوسف.",
            records: "سجلات تاريخية",
            recordsDesc: "معجزات موثقة تمتد لقرون، محفوظة في أرشيف الكنيسة والشهادات.",
            viewAll: "عرض جميع المعجزات"
        },
        gallery: {
            title: "المعرض المقدس",
            subtitle: "الأيقونات والكنيسة والقرية",
            categories: {
                all: "الكل",
                bishop: "المطران",
                sereel: "سرعل",
                church: "الكنيسة",
                icon: "الأيقونات"
            }
        },
        contact: {
            title: "تواصل معنا",
            subtitle: "قم بزيارة المزار وتابع رحلتنا",
            mapTitle: "خريطة الموقع",
            followUs: "تابعنا",
            location: "موقع الكنيسة",
            address: "العنوان",
            addressLine1: "كنيسة الخوري يوسف",
            addressLine2: "قرية سرعل - زغرتا",
            addressLine3: "لبنان",
            serviceTimes: "أوقات الخدمة",
            serviceSunday: "الأحد: 10:00 صباحاً",
            serviceWeekdays: "أيام الأسبوع: 6:00 مساءً",
            serviceFeast: "يوم العيد: خدمات خاصة",
            contactLabel: "اتصل بنا",
            contactName1: "طوني ساسين",
            contactPhone1: "+961 76 740 377",
            contactName2: "ماريا ساسين",
            contactPhone2: "+961 71 797 415"
        },
        news: {
            title: "أحدث الأخبار",
            subtitle: "ابق على اطلاع بفعاليات المجتمع وإعلاناتنا",
            readMore: "اقرأ المزيد",
            viewAll: "عرض جميع الأخبار",
            badge: "أحدث التحديثات",
            items: {
                item1: {
                    title: "اللجنة عن سويف يوسف المطران",
                    content: "سيّدنا المطران يوسف سويف يتكلّم عن اللّجنة المؤلّفة لدراسة ملفّ الخوري يوسف أبي مارون معتوق. المقرّ الصيّفي للمطرانية كرمسدّة في ١-١-٢٠٢٣"
                },
                item2: {
                    title: "عظة سيادة المطران يوسف سويف",
                    content: "من عظة سيادة المطران يوسف سويف عن الخوري يوسف أبي مارون معتوق في عيد الخوري يوسف في ٨-١١-٢.٢٢ في كنيسة الخوري يوسف سرعل"
                },
                item3: {
                    title: "فيروز في كنيسة الخوري يوسف سرعل",
                    content: ""
                },
                item4: {
                    title: "ترتيلة",
                    content: ""
                }
            }
        },
        ...footerTranslations
    }
};

