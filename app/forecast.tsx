import { ThemeToggle } from "@/components/ThemeToggle";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    ChevronRight,
    Moon,
    Star,
    Sun,
    TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Calculate Personal Year Number
function calculatePersonalYear(
    day: string,
    month: string,
    currentYear: number
): number {
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
    const y = reduce(currentYear);

    return reduce(d + m + y);
}

// Calculate Personal Month Number
function calculatePersonalMonth(
    personalYear: number,
    currentMonth: number
): number {
    const reduce = (num: number): number => {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num
                .toString()
                .split("")
                .reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    };
    return reduce(personalYear + currentMonth);
}

// Forecast data for each personal year
const yearForecast: Record<
    number,
    {
        theme: string;
        description: string;
        opportunities: string[];
        challenges: string[];
        advice: string[];
        luckyMonths: number[];
        colors: readonly [string, string, ...string[]];
    }
> = {
    1: {
        theme: "Khởi Đầu Mới",
        description:
            "Năm của những khởi đầu mới, độc lập và lãnh đạo. Đây là thời điểm để bắt đầu dự án mới, khởi nghiệp hoặc thay đổi hướng đi trong cuộc sống.",
        opportunities: [
            "Khởi nghiệp hoặc bắt đầu dự án mới",
            "Thăng tiến trong sự nghiệp",
            "Phát triển bản thân và kỹ năng lãnh đạo",
            "Gặp gỡ người có ảnh hưởng",
        ],
        challenges: [
            "Quá tự tin dẫn đến sai lầm",
            "Cô đơn do quá độc lập",
            "Xung đột với người khác",
            "Áp lực từ trách nhiệm mới",
        ],
        advice: [
            "Hãy dũng cảm bắt đầu điều bạn trì hoãn",
            "Tin vào bản thân và đừng ngại đi một mình",
            "Đặt mục tiêu rõ ràng cho năm",
            "Tránh bốc đồng, hãy lập kế hoạch kỹ",
        ],
        luckyMonths: [1, 4, 7, 10],
        colors: ["#DC2626", "#EF4444"],
    },
    2: {
        theme: "Hợp Tác & Quan Hệ",
        description:
            "Năm của sự hợp tác, quan hệ và kiên nhẫn. Đây là thời điểm để xây dựng mối quan hệ, làm việc nhóm và phát triển kỹ năng giao tiếp.",
        opportunities: [
            "Tìm được đối tác kinh doanh hoặc tình yêu",
            "Cải thiện mối quan hệ hiện tại",
            "Thành công qua hợp tác",
            "Phát triển trực giác và nhạy cảm",
        ],
        challenges: [
            "Quá phụ thuộc vào người khác",
            "Khó đưa ra quyết định",
            "Xung đột trong quan hệ",
            "Thiếu kiên nhẫn với tiến trình chậm",
        ],
        advice: [
            "Hãy kiên nhẫn, mọi thứ cần thời gian",
            "Lắng nghe nhiều hơn nói",
            "Xây dựng mạng lưới quan hệ",
            "Đừng vội vàng, hãy quan sát kỹ",
        ],
        luckyMonths: [2, 5, 8, 11],
        colors: ["#2563EB", "#3B82F6"],
    },
    3: {
        theme: "Sáng Tạo & Vui Vẻ",
        description:
            "Năm của sự sáng tạo, giao tiếp và niềm vui. Đây là thời điểm để thể hiện bản thân, học hỏi kỹ năng mới và tận hưởng cuộc sống.",
        opportunities: [
            "Phát triển tài năng nghệ thuật",
            "Giao tiếp và kết nối rộng rãi",
            "Du lịch và khám phá",
            "Học hỏi kỹ năng mới",
        ],
        challenges: [
            "Phân tâm quá nhiều",
            "Chi tiêu lãng phí",
            "Thiếu tập trung vào mục tiêu",
            "Nông cạn trong mối quan hệ",
        ],
        advice: [
            "Hãy tận hưởng và sáng tạo tự do",
            "Đừng quá nghiêm túc với mọi thứ",
            "Kết nối với nhiều người",
            "Cân bằng giữa vui chơi và trách nhiệm",
        ],
        luckyMonths: [3, 6, 9, 12],
        colors: ["#F59E0B", "#FBBF24"],
    },
    4: {
        theme: "Xây Dựng & Kỷ Luật",
        description:
            "Năm của công việc chăm chỉ, kỷ luật và xây dựng nền móng. Đây là thời điểm để tập trung vào mục tiêu dài hạn và làm việc kiên trì.",
        opportunities: [
            "Xây dựng sự nghiệp vững chắc",
            "Mua nhà hoặc đầu tư bất động sản",
            "Cải thiện sức khỏe và thói quen",
            "Hoàn thành dự án lớn",
        ],
        challenges: [
            "Làm việc quá sức",
            "Quá cứng nhắc",
            "Thiếu thời gian cho bản thân",
            "Cảm giác bị gò bó",
        ],
        advice: [
            "Hãy kiên trì và chăm chỉ",
            "Lập kế hoạch chi tiết",
            "Đừng quên nghỉ ngơi",
            "Tập trung vào chất lượng",
        ],
        luckyMonths: [4, 7, 10],
        colors: ["#059669", "#10B981"],
    },
    5: {
        theme: "Thay Đổi & Tự Do",
        description:
            "Năm của sự thay đổi, tự do và phiêu lưu. Đây là thời điểm để khám phá, trải nghiệm mới và đón nhận thay đổi.",
        opportunities: [
            "Du lịch và khám phá thế giới",
            "Thay đổi nghề nghiệp hoặc nơi ở",
            "Gặp gỡ người mới thú vị",
            "Học hỏi từ trải nghiệm",
        ],
        challenges: [
            "Thiếu ổn định",
            "Bốc đồng trong quyết định",
            "Khó cam kết",
            "Thay đổi quá nhiều",
        ],
        advice: [
            "Đón nhận thay đổi với tâm thế cởi mở",
            "Tận dụng cơ hội mới",
            "Đừng sợ mạo hiểm hợp lý",
            "Giữ sự linh hoạt",
        ],
        luckyMonths: [5, 8, 11],
        colors: ["#8B5CF6", "#A78BFA"],
    },
    6: {
        theme: "Trách Nhiệm & Yêu Thương",
        description:
            "Năm của gia đình, trách nhiệm và yêu thương. Đây là thời điểm để chăm sóc người thân và tạo sự hài hòa.",
        opportunities: [
            "Cải thiện mối quan hệ gia đình",
            "Kết hôn hoặc có con",
            "Giúp đỡ người khác",
            "Tạo không gian ấm áp",
        ],
        challenges: [
            "Quá lo lắng cho người khác",
            "Bỏ bê bản thân",
            "Áp lực từ gia đình",
            "Mất cân bằng cuộc sống",
        ],
        advice: [
            "Chăm sóc bản thân trước",
            "Đặt ranh giới lành mạnh",
            "Yêu thương có trách nhiệm",
            "Cân bằng cho và nhận",
        ],
        luckyMonths: [6, 9, 12],
        colors: ["#EC4899", "#F472B6"],
    },
    7: {
        theme: "Tâm Linh & Trí Tuệ",
        description:
            "Năm của sự suy ngẫm, học hỏi và phát triển tâm linh. Đây là thời điểm để tìm kiếm ý nghĩa sâu xa.",
        opportunities: [
            "Học hỏi và nghiên cứu sâu",
            "Phát triển tâm linh",
            "Tìm thấy ý nghĩa cuộc sống",
            "Kết nối với bản thân",
        ],
        challenges: [
            "Cô lập bản thân",
            "Quá phân tích",
            "Hoài nghi quá mức",
            "Thiếu kết nối xã hội",
        ],
        advice: [
            "Dành thời gian một mình",
            "Học hỏi từ sách và giáo viên",
            "Tin vào trực giác",
            "Cân bằng giữa một mình và xã hội",
        ],
        luckyMonths: [7, 10],
        colors: ["#7C3AED", "#A78BFA"],
    },
    8: {
        theme: "Thành Công & Quyền Lực",
        description:
            "Năm của thành công vật chất, quyền lực và thịnh vượng. Đây là thời điểm để gặt hái thành quả.",
        opportunities: [
            "Thành công lớn trong sự nghiệp",
            "Tăng thu nhập đáng kể",
            "Được thăng chức hoặc công nhận",
            "Đầu tư sinh lời",
        ],
        challenges: [
            "Quá tập trung vào tiền",
            "Áp lực thành công",
            "Xung đột quyền lực",
            "Mất cân bằng cuộc sống",
        ],
        advice: [
            "Tập trung vào mục tiêu lớn",
            "Quản lý tài chính thông minh",
            "Cân bằng tiền và hạnh phúc",
            "Sử dụng quyền lực có trách nhiệm",
        ],
        luckyMonths: [8, 11],
        colors: ["#0891B2", "#06B6D4"],
    },
    9: {
        theme: "Hoàn Thành & Buông Bỏ",
        description:
            "Năm của sự hoàn thành, buông bỏ và chuẩn bị cho chu kỳ mới. Đây là thời điểm để kết thúc và thanh lọc.",
        opportunities: [
            "Hoàn thành dự án dang dở",
            "Buông bỏ quá khứ",
            "Giúp đỡ người khác",
            "Chuẩn bị cho khởi đầu mới",
        ],
        challenges: [
            "Khó buông bỏ",
            "Cảm giác mất mát",
            "Bế tắc trong quyết định",
            "Mệt mỏi cảm xúc",
        ],
        advice: [
            "Hãy buông bỏ những gì không còn phù hợp",
            "Hoàn thành những gì bạn bắt đầu",
            "Tha thứ và chữa lành",
            "Chuẩn bị cho chu kỳ mới",
        ],
        luckyMonths: [9, 12],
        colors: ["#DB2777", "#F472B6"],
    },
};

// Month meanings
const monthMeanings: Record<number, string> = {
    1: "Khởi đầu mới, hành động",
    2: "Hợp tác, kiên nhẫn",
    3: "Sáng tạo, giao tiếp",
    4: "Làm việc chăm chỉ, kỷ luật",
    5: "Thay đổi, linh hoạt",
    6: "Trách nhiệm, gia đình",
    7: "Suy ngẫm, học hỏi",
    8: "Thành công, quyền lực",
    9: "Hoàn thành, buông bỏ",
};

export default function ForecastScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { day, month, year } = params as {
        day: string;
        month: string;
        year: string;
    };

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const personalYear = calculatePersonalYear(day, month, currentYear);
    const personalMonth = calculatePersonalMonth(personalYear, currentMonth);

    const forecast = yearForecast[personalYear];

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const selectedMonthNumber = calculatePersonalMonth(
        personalYear,
        selectedMonth
    );

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft className="text-foreground" size={24} />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">
                    Dự Báo Thời Gian
                </Text>
                <ThemeToggle />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
                {/* Current Year Overview */}
                <View className="px-6 py-8">
                    <LinearGradient
                        colors={forecast.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 20, padding: 24, alignItems: "center" }}
                    >
                        <Calendar color="#FFFFFF" size={48} />
                        <Text className="text-white text-6xl font-bold mt-4">
                            {personalYear}
                        </Text>
                        <Text className="text-white text-2xl font-semibold mt-2">
                            {forecast.theme}
                        </Text>
                        <Text className="text-white/90 text-center mt-2">
                            Năm Cá Nhân {currentYear}
                        </Text>
                    </LinearGradient>
                </View>

                {/* Year Description */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <Text className="text-foreground leading-6">
                            {forecast.description}
                        </Text>
                    </View>
                </View>

                {/* Current Month Highlight */}
                <View className="px-6 mb-6">
                    <View className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
                        <View className="flex-row items-center justify-between mb-3">
                            <View className="flex-row items-center">
                                <Sun className="text-primary mr-2" size={20} />
                                <Text className="text-lg font-bold text-foreground">
                                    Tháng Hiện Tại
                                </Text>
                            </View>
                            <View className="bg-primary rounded-full w-10 h-10 items-center justify-center">
                                <Text className="text-primary-foreground font-bold">
                                    {personalMonth}
                                </Text>
                            </View>
                        </View>
                        <Text className="text-foreground">
                            Tháng {currentMonth}/{currentYear} -{" "}
                            {monthMeanings[personalMonth]}
                        </Text>
                    </View>
                </View>

                {/* Month Calendar */}
                <View className="px-6 mb-6">
                    <Text className="text-xl font-bold text-foreground mb-4">
                        Chu Kỳ Các Tháng
                    </Text>
                    <View className="bg-card rounded-2xl p-4 border border-border">
                        <View className="flex-row flex-wrap gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
                                const monthNum = calculatePersonalMonth(personalYear, m);
                                const isLucky = forecast.luckyMonths.includes(m);
                                const isCurrent = m === currentMonth;
                                const isSelected = m === selectedMonth;

                                return (
                                    <TouchableOpacity
                                        key={m}
                                        onPress={() => setSelectedMonth(m)}
                                        className={`basis-[22%] aspect-square rounded-xl items-center justify-center ${isCurrent
                                            ? "bg-primary"
                                            : isSelected
                                                ? "bg-accent"
                                                : isLucky
                                                    ? "bg-primary/20"
                                                    : "bg-muted"
                                            }`}
                                    >
                                        <Text
                                            className={`text-xs font-medium mb-1 ${isCurrent
                                                ? "text-primary-foreground"
                                                : isSelected
                                                    ? "text-accent-foreground"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            T{m}
                                        </Text>
                                        <Text
                                            className={`text-2xl font-bold ${isCurrent
                                                ? "text-primary-foreground"
                                                : isSelected
                                                    ? "text-accent-foreground"
                                                    : "text-foreground"
                                                }`}
                                        >
                                            {monthNum}
                                        </Text>
                                        {isLucky && !isCurrent && !isSelected && (
                                            <Star className="text-primary mt-1" size={12} />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Selected Month Info */}
                        <View className="mt-4 pt-4 border-t border-border">
                            <Text className="text-sm font-semibold text-foreground mb-1">
                                Tháng {selectedMonth} - Số {selectedMonthNumber}
                            </Text>
                            <Text className="text-muted-foreground text-sm">
                                {monthMeanings[selectedMonthNumber]}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Lucky Months */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Star className="text-primary mr-2" size={20} />
                        <Text className="text-xl font-bold text-foreground">
                            Tháng May Mắn
                        </Text>
                    </View>
                    <View className="flex-row flex-wrap gap-2">
                        {forecast.luckyMonths.map((m) => (
                            <View
                                key={m}
                                className="bg-primary/10 rounded-xl px-4 py-2 border border-primary/20"
                            >
                                <Text className="text-primary font-semibold">Tháng {m}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Opportunities */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <TrendingUp className="text-primary mr-2" size={20} />
                        <Text className="text-xl font-bold text-foreground">
                            Cơ Hội Trong Năm
                        </Text>
                    </View>
                    <View className="bg-card rounded-2xl p-5 border border-border gap-3">
                        {forecast.opportunities.map((opp, index) => (
                            <View key={index} className="flex-row items-start">
                                <View className="w-2 h-2 rounded-full bg-primary mt-2 mr-3" />
                                <Text className="flex-1 text-foreground leading-6">{opp}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Challenges */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <AlertCircle className="text-destructive mr-2" size={20} />
                        <Text className="text-xl font-bold text-foreground">
                            Thách Thức Cần Lưu Ý
                        </Text>
                    </View>
                    <View className="bg-destructive/10 rounded-2xl p-5 border border-destructive/20 gap-3">
                        {forecast.challenges.map((challenge, index) => (
                            <View key={index} className="flex-row items-start">
                                <AlertCircle
                                    className="text-destructive mr-2 mt-0.5"
                                    size={16}
                                />
                                <Text className="flex-1 text-foreground leading-6">
                                    {challenge}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Advice */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Moon className="text-primary mr-2" size={20} />
                        <Text className="text-xl font-bold text-foreground">
                            Lời Khuyên Cho Năm Nay
                        </Text>
                    </View>
                    <View className="gap-3">
                        {forecast.advice.map((tip, index) => (
                            <View
                                key={index}
                                className="bg-accent/20 rounded-xl p-4 border border-accent/30 flex-row items-start"
                            >
                                <Text className="text-accent-foreground mr-2 font-bold">
                                    {index + 1}.
                                </Text>
                                <Text className="flex-1 text-accent-foreground leading-6">
                                    {tip}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* CTA Section */}
                <View className="px-6">
                    <LinearGradient
                        colors={forecast.colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 20, padding: 24 }}
                    >
                        <Text className="text-white text-xl font-bold mb-3">
                            Khám phá thêm
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                router.push(`/analysis?day=${day}&month=${month}&year=${year}`)
                            }
                        >
                            <View className="bg-white/20 rounded-xl p-4 flex-row items-center justify-between mb-3">
                                <Text className="text-white font-semibold">
                                    📊 Phân tích toàn diện
                                </Text>
                                <ChevronRight color="#FFFFFF" size={20} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>
                                router.push(`/daily?day=${day}&month=${month}&year=${year}`)
                            }
                        >
                            <View className="bg-white/20 rounded-xl p-4 flex-row items-center justify-between">
                                <Text className="text-white font-semibold">
                                    💬 Lời nhắn hàng ngày
                                </Text>
                                <ChevronRight color="#FFFFFF" size={20} />
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
