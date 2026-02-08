import { ThemeToggle } from "@/components/ThemeToggle";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    AlertCircle,
    ArrowLeft,
    BriefcaseBusiness,
    Heart,
    Shield,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    Zap,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Life Path calculation (same as result.tsx)
function calculateLifePath(day: string, month: string, year: string): number {
    const reduce = (num: number): number => {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num
                .toString()
                .split("")
                .reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    };

    const d = reduce(parseInt(day));
    const m = reduce(parseInt(month));
    const y = reduce(parseInt(year));

    return reduce(d + m + y);
}

// Full analysis data
const fullAnalysis: Record<
    number,
    {
        personality: string;
        strengths: string[];
        weaknesses: string[];
        lifePurpose: string;
        characteristics: string[];
        advice: string;
    }
> = {
    1: {
        personality:
            "Bạn là người tiên phong, sinh ra để dẫn dắt và khơi nguồn cảm hứng cho người khác. Bạn có bản năng lãnh đạo tự nhiên, luôn muốn làm chủ cuộc đời mình và không ngại đối mặt thử thách. Sự độc lập và quyết đoán là hai phẩm chất nổi bật nhất của bạn.",
        strengths: [
            "Tự tin và quyết đoán trong mọi tình huống",
            "Sáng tạo, luôn tìm ra giải pháp mới",
            "Dũng cảm đối mặt với thử thách",
            "Có khả năng truyền cảm hứng cho người khác",
            "Độc lập, tự chủ trong suy nghĩ và hành động",
        ],
        weaknesses: [
            "Đôi khi quá cứng đầu, khó nghe lời khuyên",
            "Có thể trở nên độc đoán nếu không kiểm soát",
            "Thiếu kiên nhẫn với những người chậm chạp",
            "Dễ cảm thấy cô đơn do quá độc lập",
            "Áp lực bản thân quá cao",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là dẫn dắt, khơi nguồn và tạo ra những khởi đầu mới. Bạn sinh ra để phá vỡ những giới hạn, mở đường cho người khác và để lại dấu ấn riêng trong lĩnh vực bạn chọn.",
        characteristics: [
            "Năng lượng mạnh mẽ, luôn hướng về phía trước",
            "Không thích bị kiểm soát hay phụ thuộc",
            "Thích làm việc theo cách riêng của mình",
            "Có tầm nhìn xa và khả năng chiến lược tốt",
            "Thường là người đầu tiên thử nghiệm điều mới",
        ],
        advice:
            "Hãy học cách lắng nghe và hợp tác nhiều hơn. Sức mạnh của bạn sẽ tăng gấp bội khi kết hợp với đội nhóm. Đừng sợ thể hiện sự mềm mỏng - đó không phải yếu đuối mà là sức mạnh thực sự.",
    },
    2: {
        personality:
            "Bạn là người hòa giải, cầu nối tự nhiên giữa mọi người. Bạn có khả năng thấu hiểu cảm xúc sâu sắc và tạo ra sự hài hòa trong mọi mối quan hệ. Sự nhạy cảm và trực giác mạnh mẽ giúp bạn hiểu người khác một cách kỳ diệu.",
        strengths: [
            "Đồng cảm và thấu hiểu cảm xúc người khác",
            "Kỹ năng ngoại giao và hòa giải xuất sắc",
            "Trực giác nhạy bén, cảm nhận được năng lượng",
            "Kiên nhẫn và biết lắng nghe",
            "Hợp tác tốt, làm việc nhóm hiệu quả",
        ],
        weaknesses: [
            "Quá nhạy cảm, dễ bị tổn thương",
            "Khó đưa ra quyết định vì sợ làm người khác buồn",
            "Có xu hướng phụ thuộc vào người khác",
            "Dễ bị ảnh hưởng bởi năng lượng tiêu cực",
            "Thiếu tự tin vào bản thân",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là tạo ra sự hài hòa, kết nối con người và chữa lành những mối quan hệ. Bạn sinh ra để làm cầu nối, mang lại bình an và sự cân bằng cho thế giới xung quanh.",
        characteristics: [
            "Cần môi trường hòa bình để phát triển",
            "Thích làm việc với người khác hơn làm một mình",
            "Có khả năng cảm nhận điều người khác không nói ra",
            "Yêu cầu sự công nhận và đánh giá cao",
            "Thường là người giữ hòa khí trong nhóm",
        ],
        advice:
            "Hãy học cách đặt ranh giới và nói 'không'. Bạn không thể làm hài lòng tất cả mọi người. Hãy tin vào trực giác của mình và đừng ngại đưa ra quyết định riêng.",
    },
    3: {
        personality:
            "Bạn là người sáng tạo, mang năng lượng vui vẻ và lạc quan đến mọi nơi. Bạn có tài giao tiếp xuất sắc, khả năng biểu đạt bản thân một cách nghệ thuật và luôn tìm thấy vẻ đẹp trong cuộc sống.",
        strengths: [
            "Sáng tạo và giàu trí tưởng tượng",
            "Giao tiếp xuất sắc, thu hút người khác",
            "Lạc quan, luôn nhìn mặt tích cực",
            "Đa tài, học hỏi nhanh",
            "Mang lại niềm vui cho mọi người",
        ],
        weaknesses: [
            "Dễ bị phân tâm, thiếu tập trung",
            "Khó hoàn thành công việc đến cùng",
            "Có thể quá nông cạn trong suy nghĩ",
            "Sợ bị chỉ trích, cần sự công nhận",
            "Dễ lãng phí năng lượng vào nhiều thứ",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là mang lại niềm vui, cảm hứng và sự sáng tạo cho thế giới. Bạn sinh ra để biểu đạt, giao tiếp và truyền cảm hứng qua nghệ thuật hoặc lời nói.",
        characteristics: [
            "Yêu thích sự tự do biểu đạt",
            "Cần không gian sáng tạo để phát triển",
            "Thích được chú ý và đánh giá cao",
            "Có khiếu hài hước tự nhiên",
            "Năng lượng trẻ trung, nhiệt huyết",
        ],
        advice:
            "Hãy học cách tập trung và hoàn thành những gì bạn bắt đầu. Đừng sợ đi sâu vào một lĩnh vực - sự chuyên sâu sẽ làm tài năng của bạn tỏa sáng hơn.",
    },
    4: {
        personality:
            "Bạn là người xây dựng, nền tảng vững chắc của mọi dự án. Bạn thực tế, có tổ chức và đáng tin cậy. Sự chăm chỉ và kiên nhẫn của bạn tạo nên những thành công bền vững.",
        strengths: [
            "Thực tế và có tổ chức tốt",
            "Chăm chỉ, kiên trì đến cùng",
            "Đáng tin cậy, người khác có thể dựa vào",
            "Kỷ luật và có phương pháp rõ ràng",
            "Xây dựng nền móng vững chắc",
        ],
        weaknesses: [
            "Quá cứng nhắc, khó thay đổi",
            "Thiếu linh hoạt trong tư duy",
            "Có thể trở nên quá nghiêm túc",
            "Sợ rủi ro, thích an toàn",
            "Làm việc quá sức, khó nghỉ ngơi",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là xây dựng những nền tảng vững chắc, tạo ra hệ thống và trật tự. Bạn sinh ra để biến ý tưởng thành hiện thực thông qua công việc chăm chỉ.",
        characteristics: [
            "Coi trọng sự ổn định và an toàn",
            "Thích làm việc theo kế hoạch rõ ràng",
            "Có khả năng quản lý tốt",
            "Trung thành và cam kết lâu dài",
            "Thường là trụ cột của gia đình/công ty",
        ],
        advice:
            "Hãy học cách linh hoạt và đón nhận thay đổi. Đôi khi việc phá vỡ khuôn mẫu sẽ mang lại cơ hội lớn. Đừng quên nghỉ ngơi và tận hưởng cuộc sống.",
    },
    5: {
        personality:
            "Bạn là người tự do, khao khát trải nghiệm và phiêu lưu. Bạn linh hoạt, thích nghi nhanh và luôn tìm kiếm điều mới mẻ. Sự đa dạng và tự do là điều bạn cần để phát triển.",
        strengths: [
            "Linh hoạt, thích nghi nhanh với thay đổi",
            "Yêu thích khám phá và trải nghiệm mới",
            "Năng động, nhiều năng lượng",
            "Giao tiếp tốt, dễ kết nối với người lạ",
            "Tư duy mở, không bị giới hạn",
        ],
        weaknesses: [
            "Thiếu kiên nhẫn, dễ chán",
            "Khó cam kết lâu dài",
            "Có thể bốc đồng, thiếu suy nghĩ",
            "Dễ bị phân tâm bởi nhiều thứ",
            "Sợ bị gò bó và ràng buộc",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là khám phá, trải nghiệm và chia sẻ kiến thức với người khác. Bạn sinh ra để mang lại sự tự do, đa dạng và thay đổi tích cực.",
        characteristics: [
            "Cần không gian tự do để phát triển",
            "Thích du lịch và khám phá văn hóa mới",
            "Học hỏi qua trải nghiệm thực tế",
            "Không thích công việc nhàm chán",
            "Thường có nhiều sở thích đa dạng",
        ],
        advice:
            "Hãy học cách hoàn thành những gì bạn bắt đầu. Tự do không có nghĩa là thiếu trách nhiệm. Hãy tìm sự cân bằng giữa khám phá và cam kết.",
    },
    6: {
        personality:
            "Bạn là người chăm sóc, có trái tim ấm áp và luôn muốn giúp đỡ người khác. Bạn có trách nhiệm cao, yêu thương sâu sắc và tạo ra môi trường hài hòa cho mọi người.",
        strengths: [
            "Có trách nhiệm và đáng tin cậy",
            "Yêu thương và chăm sóc người khác",
            "Tạo ra sự hài hòa trong gia đình/công việc",
            "Có khiếu thẩm mỹ tốt",
            "Trung thành và cam kết sâu sắc",
        ],
        weaknesses: [
            "Quá lo lắng cho người khác",
            "Khó từ chối, dễ bị lợi dụng",
            "Có xu hướng kiểm soát quá mức",
            "Bỏ bê bản thân vì người khác",
            "Kỳ vọng quá cao vào mối quan hệ",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là chăm sóc, nuôi dưỡng và tạo ra sự hài hòa. Bạn sinh ra để yêu thương, hỗ trợ và mang lại sự ấm áp cho cộng đồng.",
        characteristics: [
            "Gia đình là ưu tiên hàng đầu",
            "Thích tạo ra không gian đẹp và ấm cúng",
            "Có khả năng tư vấn và hỗ trợ tốt",
            "Cần được yêu thương và đánh giá cao",
            "Thường là người giữ gia đình/nhóm gắn kết",
        ],
        advice:
            "Hãy học cách chăm sóc bản thân trước khi chăm sóc người khác. Bạn không thể đổ từ cái bình rỗng. Đặt ranh giới lành mạnh là yêu thương, không phải ích kỷ.",
    },
    7: {
        personality:
            "Bạn là người tìm kiếm chân lý, có tâm hồn sâu sắc và trí tuệ phi thường. Bạn cần không gian riêng để suy ngẫm, phân tích và khám phá những bí ẩn của cuộc sống.",
        strengths: [
            "Trí tuệ sâu sắc và phân tích tốt",
            "Trực giác mạnh mẽ",
            "Tìm kiếm sự thật và ý nghĩa",
            "Độc lập trong tư duy",
            "Có khả năng nghiên cứu xuất sắc",
        ],
        weaknesses: [
            "Có xu hướng cô lập bản thân",
            "Quá phân tích, khó đưa ra quyết định",
            "Khó tin tưởng người khác",
            "Có thể trở nên hoài nghi quá mức",
            "Thiếu kỹ năng xã hội",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là tìm kiếm chân lý, chia sẻ tri thức và giúp người khác hiểu sâu hơn về cuộc sống. Bạn sinh ra để nghiên cứu, khám phá và khai sáng.",
        characteristics: [
            "Cần thời gian một mình để nạp năng lượng",
            "Thích học hỏi và nghiên cứu sâu",
            "Quan tâm đến tâm linh và triết học",
            "Không thích sự ồn ào và hời hợt",
            "Thường có ít bạn nhưng rất sâu sắc",
        ],
        advice:
            "Hãy học cách mở lòng và kết nối với người khác. Tri thức của bạn sẽ có ý nghĩa hơn khi được chia sẻ. Đừng sợ thể hiện cảm xúc - đó là phần quan trọng của con người.",
    },
    8: {
        personality:
            "Bạn là người thành đạt, có tham vọng lớn và khả năng biến ước mơ thành hiện thực. Bạn có năng lực kinh doanh tự nhiên và sức mạnh để đạt được thành công vật chất.",
        strengths: [
            "Có tầm nhìn lớn và tham vọng cao",
            "Khả năng quản lý và kinh doanh tốt",
            "Quyết tâm mạnh mẽ đạt mục tiêu",
            "Tự tin và có sức ảnh hưởng",
            "Biết cách tạo ra giá trị và thịnh vượng",
        ],
        weaknesses: [
            "Quá tập trung vào vật chất",
            "Có thể trở nên độc đoán",
            "Khó cân bằng công việc và cuộc sống",
            "Áp lực bản thân quá cao",
            "Dễ bỏ qua cảm xúc vì mục tiêu",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là tạo ra thịnh vượng, xây dựng di sản và sử dụng quyền lực để tạo tác động tích cực. Bạn sinh ra để thành công và nâng đỡ người khác cùng phát triển.",
        characteristics: [
            "Có khả năng lãnh đạo và quản lý tốt",
            "Thích thử thách lớn và mục tiêu cao",
            "Coi trọng kết quả và hiệu quả",
            "Có khả năng tài chính tốt",
            "Thường đạt được vị trí cao trong sự nghiệp",
        ],
        advice:
            "Hãy nhớ rằng thành công thực sự bao gồm cả hạnh phúc và ý nghĩa. Đừng hy sinh sức khỏe và mối quan hệ vì tiền bạc. Quyền lực thực sự là dùng để phục vụ, không phải kiểm soát.",
    },
    9: {
        personality:
            "Bạn là người nhân đạo, có tâm hồn bao dung và khao khát làm cho thế giới tốt đẹp hơn. Bạn có khả năng thấu hiểu sâu sắc và muốn cống hiến cho nhân loại.",
        strengths: [
            "Lòng từ bi và bao dung lớn",
            "Có tầm nhìn toàn cầu",
            "Khả năng nghệ thuật và sáng tạo cao",
            "Thấu hiểu nhiều lĩnh vực khác nhau",
            "Muốn cống hiến cho cộng đồng",
        ],
        weaknesses: [
            "Quá lý tưởng hóa, dễ thất vọng",
            "Khó buông bỏ quá khứ",
            "Có thể hy sinh bản thân quá mức",
            "Dễ cảm thấy gánh nặng của thế giới",
            "Khó tập trung vào bản thân",
        ],
        lifePurpose:
            "Sứ mệnh của bạn là phục vụ nhân loại, lan tỏa tình yêu thương và tạo ra thay đổi tích cực cho thế giới. Bạn sinh ra để hoàn thiện và nâng tầm ý thức tập thể.",
        characteristics: [
            "Quan tâm đến các vấn đề xã hội",
            "Có khả năng kết nối với mọi tầng lớp",
            "Thích công việc mang ý nghĩa sâu sắc",
            "Có trực giác và sự thấu hiểu cao",
            "Thường là người truyền cảm hứng",
        ],
        advice:
            "Hãy học cách chăm sóc bản thân trước khi cứu thế giới. Bạn không thể giúp người khác nếu chính mình đang kiệt sức. Hãy buông bỏ quá khứ để sống trọn vẹn hiện tại.",
    },
};

export default function AnalysisScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { name, day, month, year } = params as {
        name: string;
        day: string;
        month: string;
        year: string;
    };

    const lifePathNumber = calculateLifePath(day, month, year);
    const data = fullAnalysis[lifePathNumber];

    const gradientColors: Record<number, readonly [string, string, ...string[]]> = {
        1: ["#DC2626", "#EF4444"],
        2: ["#2563EB", "#3B82F6"],
        3: ["#F59E0B", "#FBBF24"],
        4: ["#059669", "#10B981"],
        5: ["#8B5CF6", "#A78BFA"],
        6: ["#EC4899", "#F472B6"],
        7: ["#7C3AED", "#A78BFA"],
        8: ["#0891B2", "#06B6D4"],
        9: ["#DB2777", "#F472B6"],
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft className="text-foreground" size={24} />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">
                    Phân Tích Đầy Đủ
                </Text>
                <ThemeToggle />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
                {/* Number Display */}
                <View className="px-6 py-8">
                    <LinearGradient
                        colors={gradientColors[lifePathNumber]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 20,
                            padding: 24,
                            alignItems: "center",
                        }}
                    >
                        <Text className="text-white text-8xl font-bold">
                            {lifePathNumber}
                        </Text>
                        <Text className="text-white text-xl font-semibold mt-2">
                            Số Chủ Đạo
                        </Text>
                        {name && (
                            <Text className="text-white/90 text-base mt-2">{name}</Text>
                        )}
                    </LinearGradient>
                </View>

                {/* Personality Overview */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <View className="flex-row items-center mb-3">
                            <Sparkles className="text-primary mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">
                                Tổng Quan Tính Cách
                            </Text>
                        </View>
                        <Text className="text-muted-foreground leading-6">
                            {data.personality}
                        </Text>
                    </View>
                </View>

                {/* Strengths */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <View className="flex-row items-center mb-4">
                            <Star className="text-primary mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">
                                Điểm Mạnh
                            </Text>
                        </View>
                        {data.strengths.map((strength, index) => (
                            <View key={index} className="flex-row items-start mb-3">
                                <View className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
                                <Text className="flex-1 text-foreground">{strength}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Weaknesses */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <View className="flex-row items-center mb-4">
                            <AlertCircle className="text-destructive mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">
                                Điểm Cần Cải Thiện
                            </Text>
                        </View>
                        {data.weaknesses.map((weakness, index) => (
                            <View key={index} className="flex-row items-start mb-3">
                                <View className="w-2 h-2 rounded-full bg-destructive mt-2 mr-3" />
                                <Text className="flex-1 text-muted-foreground">{weakness}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Life Purpose */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <View className="flex-row items-center mb-3">
                            <Target className="text-primary mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">
                                Sứ Mệnh Cuộc Đời
                            </Text>
                        </View>
                        <Text className="text-muted-foreground leading-6">
                            {data.lifePurpose}
                        </Text>
                    </View>
                </View>

                {/* Characteristics */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <View className="flex-row items-center mb-4">
                            <Zap className="text-primary mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">
                                Đặc Điểm Nổi Bật
                            </Text>
                        </View>
                        {data.characteristics.map((char, index) => (
                            <View key={index} className="flex-row items-start mb-3">
                                <View className="w-2 h-2 rounded-full bg-accent mt-2 mr-3" />
                                <Text className="flex-1 text-foreground">{char}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Advice */}
                <View className="px-6 mb-6">
                    <View className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                        <View className="flex-row items-center mb-3">
                            <Shield className="text-primary mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">
                                Lời Khuyên Dành Cho Bạn
                            </Text>
                        </View>
                        <Text className="text-foreground leading-6">{data.advice}</Text>
                    </View>
                </View>

                {/* CTA to other sections */}
                <View className="px-6 gap-3">
                    <TouchableOpacity
                        onPress={() => router.push(`/career?number=${lifePathNumber}` as any)}
                    >
                        <View className="bg-card rounded-2xl p-5 border border-border flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <BriefcaseBusiness className="text-primary mr-3" size={24} />
                                <View className="flex-1">
                                    <Text className="text-foreground font-semibold">
                                        Sự Nghiệp & Tài Chính
                                    </Text>
                                    <Text className="text-muted-foreground text-sm">
                                        Khám phá hướng đi phù hợp
                                    </Text>
                                </View>
                            </View>
                            <ArrowLeft
                                className="text-muted-foreground rotate-180"
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/paywall" as any)}>
                        <View className="bg-card rounded-2xl p-5 border border-border flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <Heart className="text-primary mr-3" size={24} />
                                <View className="flex-1">
                                    <Text className="text-foreground font-semibold">
                                        Tình Yêu & Tương Hợp
                                    </Text>
                                    <Text className="text-muted-foreground text-sm">
                                        Ai phù hợp với bạn?
                                    </Text>
                                </View>
                            </View>
                            <ArrowLeft
                                className="text-muted-foreground rotate-180"
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/paywall" as any)}>
                        <View className="bg-card rounded-2xl p-5 border border-border flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <TrendingUp className="text-primary mr-3" size={24} />
                                <View className="flex-1">
                                    <Text className="text-foreground font-semibold">
                                        Dự Báo Thời Gian
                                    </Text>
                                    <Text className="text-muted-foreground text-sm">
                                        Chu kỳ năm/tháng của bạn
                                    </Text>
                                </View>
                            </View>
                            <ArrowLeft
                                className="text-muted-foreground rotate-180"
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
