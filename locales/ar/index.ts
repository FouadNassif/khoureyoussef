import storyTranslations from './story';
import miraclesTranslations from './miracles';

export default {
    translation: {
        nav: {
            home: "الرئيسية",
            story: "القصة",
            miracles: "المعجزات",
            gallery: "المعرض",
            news: "الأخبار",
            contact: "اتصل بنا"
        },
        hero: {
            title: "مار ميخائيل السريلي",
            subtitle: "شفيع قريتنا",
            description: "اكتشف الحياة المقدسة والمعجزات والإرث الأبدي للقديس مار ميخائيل",
            readMore: "اقرأ قصته",
            feastDay: "عيده: 29 أيلول"
        },
        home: {
            latestMiracle: "أحدث معجزة",
            featuredMiracleTitle: "شهادة إيمان",
            miracleDate: "كانون الأول 2024",
            miracleHeading: "شفاء معجزي بالصلاة",
            miracleDescription: "حاج مؤمن شُفي تماماً من مرض خطير بعد الصلاة في مزار مار ميخائيل. أكد الأطباء أن الشفاء غير قابل للتفسير طبياً، ونسبوه إلى تدخل إلهي بشفاعة القديس.",
            readFullStory: "اقرأ القصة الكاملة",
            visitSaint: "زيارة القديس",
            visitDescription: "مزار مار ميخائيل في السريل كان ملاذاً للإيمان عبر الأجيال. اختبر الأجواء المقدسة، واشهد قروناً من التفاني، واتصل بالحضور الإلهي لقديسنا الحبيب.",
            planVisit: "خطط لزيارتك"
        },
        ...storyTranslations.story,
        ...miraclesTranslations,
        miracles: {
            title: "المعجزات الإلهية",
            subtitle: "شهادات الإيمان والنعمة",
            healing: "معجزات الشفاء",
            healingDesc: "شهادات لا تحصى من الشفاء الجسدي والروحي بشفاعة القديس.",
            prayers: "صلوات مستجابة",
            prayersDesc: "المؤمنون من جميع أنحاء المنطقة يشاركون قصص الصلوات المستجابة بواسطة مار ميخائيل.",
            records: "سجلات تاريخية",
            recordsDesc: "معجزات موثقة تمتد لقرون، محفوظة في أرشيف الكنيسة والشهادات.",
            viewAll: "عرض جميع المعجزات"
        },
        gallery: {
            title: "المعرض المقدس",
            subtitle: "الأيقونات والكنيسة والقرية"
        },
        contact: {
            title: "تواصل معنا",
            subtitle: "قم بزيارة المزار وتابع رحلتنا",
            mapTitle: "خريطة الموقع",
            followUs: "تابعنا",
            location: "موقع الكنيسة"
        },
        news: {
            title: "أحدث الأخبار",
            subtitle: "ابق على اطلاع بفعاليات المجتمع وإعلاناتنا",
            readMore: "اقرأ المزيد",
            viewAll: "عرض جميع الأخبار"
        },
        footer: {
            about: "عن مار ميخائيل",
            village: "قرية السريل",
            rights: "جميع الحقوق محفوظة"
        }
    }
};

