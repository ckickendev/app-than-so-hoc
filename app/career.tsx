import { ThemeToggle } from "@/components/ThemeToggle";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    Award,
    Briefcase,
    Building,
    Lightbulb,
    Rocket,
    Target
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Career data for each life path number
const careerData: Record<
    number,
    {
        suitableCareers: string[];
        workStyle: {
            type: "business" | "office" | "both";
            reason: string;
        };
        moneyMindset: string[];
        successTips: string[];
        avoidCareers: string[];
    }
> = {
    1: {
        suitableCareers: [
            "Doanh nhân, CEO",
            "Quản lý cấp cao",
            "Kiến trúc sư",
            "Kỹ sư trưởng",
            "Nhà phát minh",
            "Freelancer độc lập",
        ],
        workStyle: {
            type: "business",
            reason:
                "Bạn sinh ra để dẫn dắt, không phù hợp với vai trò nhân viên lâu dài. Môi trường tự do và quyền quyết định là điều bạn cần.",
        },
        moneyMindset: [
            "Đừng sợ rủi ro - bạn sinh ra để tiên phong",
            "Tin vào bản thân và ý tưởng của mình",
            "Tiền đến từ việc tạo ra giá trị mới, không phải làm theo",
        ],
        successTips: [
            "Khởi nghiệp sớm nếu có thể",
            "Xây dựng thương hiệu cá nhân mạnh mẽ",
            "Đừng ngại đi ngược đám đông",
            "Học cách ủy quyền thay vì làm tất cả",
        ],
        avoidCareers: ["Công việc hành chính lặp đi lặp lại", "Nhân viên văn phòng thụ động"],
    },
    2: {
        suitableCareers: [
            "Nhà tư vấn, coach",
            "Nhân sự (HR)",
            "Trợ lý điều hành",
            "Nhà ngoại giao",
            "Chuyên viên quan hệ khách hàng",
            "Giáo viên mầm non",
        ],
        workStyle: {
            type: "office",
            reason:
                "Bạn xuất sắc trong làm việc nhóm và hỗ trợ người khác. Môi trường ổn định, có đồng nghiệp tốt sẽ giúp bạn phát huy tối đa.",
        },
        moneyMindset: [
            "Tiền đến từ mối quan hệ và sự hợp tác",
            "Đừng tự làm mọi thứ - hãy kết nối với người giỏi hơn",
            "Sự kiên nhẫn của bạn sẽ được đền đáp",
        ],
        successTips: [
            "Tìm mentor hoặc đối tác tốt",
            "Phát triển kỹ năng giao tiếp và đàm phán",
            "Đừng ngại làm vai trò hỗ trợ - đó là điểm mạnh",
            "Xây dựng mạng lưới quan hệ rộng",
        ],
        avoidCareers: ["Công việc đòi hỏi quyết đoán nhanh một mình", "Môi trường cạnh tranh khốc liệt"],
    },
    3: {
        suitableCareers: [
            "Nghệ sĩ, diễn viên",
            "Content creator, influencer",
            "Marketing, quảng cáo",
            "Nhà thiết kế",
            "MC, diễn giả",
            "Nhà văn, blogger",
        ],
        workStyle: {
            type: "both",
            reason:
                "Bạn cần tự do sáng tạo nhưng cũng thích được công nhận. Làm việc tự do hoặc môi trường văn hóa trẻ trung đều phù hợp.",
        },
        moneyMindset: [
            "Tiền đến từ sự sáng tạo và cá tính của bạn",
            "Đừng làm việc nhàm chán chỉ vì lương cao",
            "Niềm vui trong công việc = tiền sẽ theo",
        ],
        successTips: [
            "Xây dựng thương hiệu cá nhân độc đáo",
            "Học cách biến sở thích thành nghề nghiệp",
            "Đừng ngại thể hiện bản thân",
            "Kết hợp nhiều dự án để tránh nhàm chán",
        ],
        avoidCareers: ["Công việc kỹ thuật khô khan", "Môi trường quá nghiêm túc, cứng nhắc"],
    },
    4: {
        suitableCareers: [
            "Kế toán, kiểm toán",
            "Quản lý dự án",
            "Kỹ sư xây dựng",
            "Luật sư",
            "Chuyên viên phân tích dữ liệu",
            "Quản lý vận hành",
        ],
        workStyle: {
            type: "office",
            reason:
                "Bạn thích sự ổn định, quy trình rõ ràng. Môi trường công ty lớn, có hệ thống chặt chẽ phù hợp với bạn nhất.",
        },
        moneyMindset: [
            "Tiền đến từ sự kiên trì và làm việc chăm chỉ",
            "Đầu tư dài hạn, tránh đầu cơ ngắn hạn",
            "Xây dựng tài sản từ từ, vững chắc",
        ],
        successTips: [
            "Tập trung vào một lĩnh vực và trở thành chuyên gia",
            "Xây dựng quy trình làm việc hiệu quả",
            "Đừng ngại công việc tỉ mỉ - đó là điểm mạnh",
            "Tiết kiệm và đầu tư thông minh",
        ],
        avoidCareers: ["Công việc không ổn định, thay đổi liên tục", "Nghề tự do thiếu quy trình"],
    },
    5: {
        suitableCareers: [
            "Du lịch, hướng dẫn viên",
            "Nhà báo, phóng viên",
            "Sales, kinh doanh",
            "Event planner",
            "Phi công, tiếp viên",
            "Startup founder",
        ],
        workStyle: {
            type: "business",
            reason:
                "Bạn cần tự do và thay đổi liên tục. Công việc văn phòng 9-5 sẽ khiến bạn cảm thấy bị giam cầm.",
        },
        moneyMindset: [
            "Tiền đến từ sự linh hoạt và dám thử nghiệm",
            "Đừng ở một chỗ quá lâu nếu không còn phát triển",
            "Nhiều nguồn thu nhập > một công việc ổn định",
        ],
        successTips: [
            "Tạo nhiều nguồn thu nhập",
            "Đừng ngại thay đổi ngành nghề nếu cần",
            "Học cách quản lý tài chính vì bạn dễ tiêu xài",
            "Kết hợp công việc với đam mê du lịch",
        ],
        avoidCareers: ["Công việc hành chính cứng nhắc", "Môi trường ít thay đổi"],
    },
    6: {
        suitableCareers: [
            "Bác sĩ, y tá",
            "Giáo viên",
            "Tư vấn tâm lý",
            "Chăm sóc khách hàng",
            "Nhà thiết kế nội thất",
            "Đầu bếp, dinh dưỡng",
        ],
        workStyle: {
            type: "office",
            reason:
                "Bạn cần cảm giác được giúp đỡ người khác. Môi trường có ý nghĩa xã hội, được chăm sóc con người phù hợp nhất.",
        },
        moneyMindset: [
            "Tiền đến từ việc chăm sóc và phục vụ người khác",
            "Đừng làm việc chỉ vì tiền - hãy tìm ý nghĩa",
            "Sự tận tâm của bạn sẽ được đền đáp xứng đáng",
        ],
        successTips: [
            "Chọn nghề có ý nghĩa với bạn",
            "Xây dựng danh tiếng qua sự tận tâm",
            "Đừng để người khác lợi dụng lòng tốt",
            "Học cách nói không khi cần thiết",
        ],
        avoidCareers: ["Công việc chỉ hướng đến lợi nhuận", "Môi trường cạnh tranh khốc liệt"],
    },
    7: {
        suitableCareers: [
            "Nhà nghiên cứu, khoa học",
            "Lập trình viên",
            "Nhà phân tích",
            "Triết gia, tâm linh",
            "Giảng viên đại học",
            "Chuyên gia IT",
        ],
        workStyle: {
            type: "both",
            reason:
                "Bạn cần không gian riêng để suy nghĩ sâu. Làm remote hoặc nghiên cứu độc lập phù hợp hơn môi trường ồn ào.",
        },
        moneyMindset: [
            "Tiền đến từ kiến thức và chuyên môn sâu",
            "Đầu tư vào bản thân trước khi đầu tư vào gì khác",
            "Chất lượng > số lượng trong mọi thứ",
        ],
        successTips: [
            "Trở thành chuyên gia trong lĩnh vực hẹp",
            "Dành thời gian học hỏi liên tục",
            "Đừng ngại làm việc một mình",
            "Xây dựng uy tín qua chuyên môn",
        ],
        avoidCareers: ["Công việc nông cạn, không học hỏi", "Sales đòi hỏi giao tiếp quá nhiều"],
    },
    8: {
        suitableCareers: [
            "Doanh nhân, nhà đầu tư",
            "Giám đốc tài chính (CFO)",
            "Banker, tài chính",
            "Bất động sản",
            "Luật sư doanh nghiệp",
            "Quản lý cấp cao",
        ],
        workStyle: {
            type: "business",
            reason:
                "Bạn sinh ra để làm giàu và quản lý quyền lực. Khởi nghiệp hoặc vị trí điều hành là con đường tốt nhất.",
        },
        moneyMindset: [
            "Tiền là công cụ để tạo ra sức ảnh hưởng",
            "Nghĩ lớn, đừng tự giới hạn bản thân",
            "Đầu tư thông minh, đừng chỉ làm công ăn lương",
        ],
        successTips: [
            "Học về tài chính và đầu tư từ sớm",
            "Xây dựng mạng lưới với người thành công",
            "Đừng ngại vay nợ thông minh để phát triển",
            "Cân bằng giữa tiền và đạo đức",
        ],
        avoidCareers: ["Công việc lương thấp, không tiềm năng tăng trưởng", "Nghề không liên quan đến tiền"],
    },
    9: {
        suitableCareers: [
            "Nhà hoạt động xã hội",
            "Nghệ sĩ nhân đạo",
            "Giáo viên, đào tạo",
            "Nhà trị liệu",
            "Tổ chức phi lợi nhuận",
            "Tư vấn tâm linh",
        ],
        workStyle: {
            type: "both",
            reason:
                "Bạn cần cảm giác làm điều có ý nghĩa cho nhân loại. Tiền không phải động lực chính của bạn.",
        },
        moneyMindset: [
            "Tiền đến khi bạn sống đúng với sứ mệnh",
            "Cho đi nhiều = nhận lại nhiều (luật vũ trụ)",
            "Đừng làm việc vì tiền - hãy làm vì tác động",
        ],
        successTips: [
            "Tìm công việc có tác động xã hội",
            "Kết hợp đam mê với thu nhập",
            "Đừng để người khác lợi dụng lòng tốt",
            "Học cách quản lý tài chính cá nhân",
        ],
        avoidCareers: ["Công việc chỉ hướng đến lợi nhuận", "Ngành gây hại cho xã hội"],
    },
};

export default function CareerScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const lifePathNumber = parseInt(params.number as string) || 1;
    const career = careerData[lifePathNumber];

    const workStyleIcon =
        career.workStyle.type === "business" ? (
            <Rocket className="text-primary" size={24} />
        ) : career.workStyle.type === "office" ? (
            <Building className="text-primary" size={24} />
        ) : (
            <Target className="text-primary" size={24} />
        );

    const workStyleTitle =
        career.workStyle.type === "business"
            ? "Kinh doanh / Tự do"
            : career.workStyle.type === "office"
                ? "Văn phòng / Ổn định"
                : "Linh hoạt (Cả hai)";

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft className="text-foreground" size={24} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-foreground">Sự Nghiệp & Tài Chính</Text>
                <ThemeToggle />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
                {/* Hero Section */}
                <LinearGradient
                    colors={["#7C3AED", "#A78BFA"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 24, marginHorizontal: 24, marginTop: 16, borderRadius: 16 }}
                >
                    <View className="items-center">
                        <Briefcase color="#ffffff" size={48} />
                        <Text className="text-white text-2xl font-bold mt-4 text-center">
                            Con đường sự nghiệp của số {lifePathNumber}
                        </Text>
                        <Text className="text-white/90 text-center mt-2">
                            Khám phá nghề nghiệp phù hợp và cách làm giàu
                        </Text>
                    </View>
                </LinearGradient>

                {/* Work Style */}
                <View className="px-6 mt-6">
                    <View className="bg-card rounded-xl p-5 border border-border">
                        <View className="flex-row items-center gap-3 mb-3">
                            {workStyleIcon}
                            <Text className="text-lg font-bold text-foreground">{workStyleTitle}</Text>
                        </View>
                        <Text className="text-muted-foreground leading-6">{career.workStyle.reason}</Text>
                    </View>
                </View>

                {/* Suitable Careers */}
                <View className="px-6 mt-6">
                    <Text className="text-xl font-bold text-foreground mb-4">
                        ✨ Nghề nghiệp phù hợp
                    </Text>
                    <View className="gap-3">
                        {career.suitableCareers.map((job, index) => (
                            <View key={index} className="bg-card rounded-xl p-4 border border-border">
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-primary/10 rounded-full p-2">
                                        <Award className="text-primary" size={20} />
                                    </View>
                                    <Text className="text-foreground font-medium flex-1">{job}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Money Mindset */}
                <View className="px-6 mt-6">
                    <Text className="text-xl font-bold text-foreground mb-4">
                        💰 Tư duy tiền bạc
                    </Text>
                    <View className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/20">
                        {career.moneyMindset.map((mindset, index) => (
                            <View key={index} className="flex-row gap-3 mb-3 last:mb-0">
                                <Text className="text-amber-600 dark:text-amber-400 font-bold">💡</Text>
                                <Text className="text-foreground flex-1 leading-6">{mindset}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Success Tips */}
                <View className="px-6 mt-6">
                    <Text className="text-xl font-bold text-foreground mb-4">
                        🎯 Bí quyết thành công
                    </Text>
                    <View className="gap-3">
                        {career.successTips.map((tip, index) => (
                            <View key={index} className="bg-card rounded-xl p-4 border border-border">
                                <View className="flex-row items-start gap-3">
                                    <View className="bg-primary/10 rounded-full p-2 mt-0.5">
                                        <Lightbulb className="text-primary" size={18} />
                                    </View>
                                    <Text className="text-foreground flex-1 leading-6">{tip}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Avoid Careers */}
                <View className="px-6 mt-6">
                    <Text className="text-xl font-bold text-foreground mb-4">
                        ⚠️ Nên tránh
                    </Text>
                    <View className="bg-destructive/10 rounded-xl p-5 border border-destructive/20">
                        {career.avoidCareers.map((avoid, index) => (
                            <View key={index} className="flex-row items-start gap-3 mb-2 last:mb-0">
                                <Text className="text-destructive">•</Text>
                                <Text className="text-foreground flex-1 leading-6">{avoid}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* CTA Section */}
                <View className="px-6 mt-8">
                    <LinearGradient
                        colors={["#7C3AED", "#A78BFA"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 20, borderRadius: 16 }}
                    >
                        <Text className="text-white text-lg font-bold text-center mb-3">
                            Khám phá thêm về bản thân
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push(`/analysis?number=${lifePathNumber}`)}
                            className="bg-white rounded-xl py-3 mb-2"
                        >
                            <Text className="text-primary text-center font-semibold">
                                📊 Phân tích toàn diện
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push(`/love?number=${lifePathNumber}`)}
                            className="bg-white/20 rounded-xl py-3"
                        >
                            <Text className="text-white text-center font-semibold">
                                ❤️ Tình yêu & Hợp đôi
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}