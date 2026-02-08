import { ThemeToggle } from "@/components/ThemeToggle";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    Briefcase,
    Heart,
    Lock,
    Sparkles,
    TrendingUp,
} from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Life Path Number calculation
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

// Numerology data (Vietnamese)
const numerologyData: Record<
    number,
    {
        title: string;
        traits: string[];
        quote: string;
        color: readonly [string, string, ...string[]];
    }
> = {
    1: {
        title: "Người Lãnh Đạo",
        traits: [
            "Độc lập, tự chủ",
            "Quyết đoán và mạnh mẽ",
            "Tiên phong, sáng tạo",
        ],
        quote: "Bạn sinh ra để dẫn đầu, không phải đi theo.",
        color: ["#DC2626", "#EF4444"],
    },
    2: {
        title: "Người Hòa Giải",
        traits: ["Nhạy cảm, cảm thông", "Hợp tác tốt", "Trực giác mạnh mẽ"],
        quote: "Sức mạnh của bạn nằm ở sự kết nối và thấu hiểu.",
        color: ["#2563EB", "#3B82F6"],
    },
    3: {
        title: "Người Sáng Tạo",
        traits: [
            "Vui vẻ, lạc quan",
            "Giao tiếp xuất sắc",
            "Nghệ thuật và sáng tạo",
        ],
        quote: "Bạn mang niềm vui và cảm hứng đến mọi người.",
        color: ["#F59E0B", "#FBBF24"],
    },
    4: {
        title: "Người Xây Dựng",
        traits: ["Thực tế, có tổ chức", "Chăm chỉ, kiên nhẫn", "Đáng tin cậy"],
        quote: "Nền móng vững chắc tạo nên thành công bền vững.",
        color: ["#059669", "#10B981"],
    },
    5: {
        title: "Người Tự Do",
        traits: [
            "Yêu tự do và phiêu lưu",
            "Linh hoạt, thích nghi tốt",
            "Tò mò và năng động",
        ],
        quote: "Cuộc đời là hành trình khám phá không ngừng.",
        color: ["#8B5CF6", "#A78BFA"],
    },
    6: {
        title: "Người Nuôi Dưỡng",
        traits: [
            "Yêu thương và chăm sóc",
            "Trách nhiệm cao",
            "Hài hòa và cân bằng",
        ],
        quote: "Bạn là nguồn yêu thương và sự ấm áp cho mọi người.",
        color: ["#EC4899", "#F472B6"],
    },
    7: {
        title: "Người Tìm Kiếm Tri Thức",
        traits: ["Sâu sắc, triết lý", "Trực giác tâm linh", "Yêu sự tĩnh lặng"],
        quote: "Bạn tìm kiếm chân lý và ý nghĩa sâu xa của cuộc sống.",
        color: ["#7C3AED", "#A78BFA"],
    },
    8: {
        title: "Người Quyền Lực",
        traits: [
            "Tham vọng và quyết tâm",
            "Khả năng quản lý tốt",
            "Thành công vật chất",
        ],
        quote: "Bạn sinh ra để đạt được những thành tựu lớn lao.",
        color: ["#0891B2", "#06B6D4"],
    },
    9: {
        title: "Người Nhân Đạo",
        traits: ["Rộng lượng, vị tha", "Trí tuệ và từ bi", "Tầm nhìn toàn cầu"],
        quote: "Bạn sống để phục vụ và nâng tầm nhân loại.",
        color: ["#16A34A", "#22C55E"],
    },
};

export default function ResultScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { name, day, month, year } = params as {
        name: string;
        day: string;
        month: string;
        year: string;
    };

    const lifePathNumber = calculateLifePath(day, month, year);
    const data = numerologyData[lifePathNumber] || numerologyData[1];

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft className="text-foreground" size={24} />
                    </TouchableOpacity>
                    <ThemeToggle />
                </View>

                {/* Hero Number Display */}
                <View className="px-6 mb-8">
                    <LinearGradient
                        colors={data.color}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 24,
                            padding: 40,
                            alignItems: "center",
                        }}
                    >
                        <Text className="text-white/80 text-lg mb-2">
                            Số chủ đạo của bạn
                        </Text>
                        <Text className="text-white text-7xl font-bold mb-4">
                            {lifePathNumber}
                        </Text>
                        <Text className="text-white text-2xl font-bold text-center">
                            {data.title}
                        </Text>
                    </LinearGradient>
                </View>

                {/* Greeting */}
                {name && (
                    <View className="px-6 mb-6">
                        <Text className="text-xl text-foreground text-center">
                            Xin chào, <Text className="font-bold">{name}</Text> 👋
                        </Text>
                    </View>
                )}

                {/* Free Personality Traits */}
                <View className="px-6 mb-8">
                    <Text className="text-2xl font-bold text-foreground mb-4">
                        ✨ Tính cách của bạn
                    </Text>
                    <View className="bg-card border border-border rounded-2xl p-5 gap-4">
                        {data.traits.map((trait, index) => (
                            <View key={index} className="flex-row items-start">
                                <View className="bg-primary/10 rounded-full w-8 h-8 items-center justify-center mr-3 mt-0.5">
                                    <Text className="text-primary font-bold">{index + 1}</Text>
                                </View>
                                <Text className="text-foreground text-base flex-1 leading-6">
                                    {trait}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Motivational Quote */}
                <View className="px-6 mb-8">
                    <View className="bg-accent/20 border border-accent/30 rounded-2xl p-6">
                        <Sparkles className="text-primary mb-3" size={32} />
                        <Text className="text-foreground text-lg font-semibold leading-7">
                            "{data.quote}"
                        </Text>
                    </View>
                </View>

                {/* Locked Premium Sections */}
                <View className="px-6 gap-4">
                    <Text className="text-xl font-bold text-foreground mb-2">
                        🔓 Khám phá thêm về bản thân
                    </Text>

                    {/* Career Section */}
                    <TouchableOpacity
                        onPress={() => router.push(`/career?number=${lifePathNumber}`)}
                        className="bg-card border-2 border-border rounded-2xl overflow-hidden"
                    >
                        <View className="p-5">
                            <View className="flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center">
                                    <Briefcase className="text-primary mr-3" size={24} />
                                    <Text className="text-lg font-bold text-foreground">
                                        Nghề nghiệp phù hợp
                                    </Text>
                                </View>
                                <Lock className="text-muted-foreground" size={20} />
                            </View>
                            <Text className="text-muted-foreground mb-4">
                                Khám phá con đường sự nghiệp giúp bạn phát huy tối đa tiềm năng
                            </Text>
                            <View className="bg-primary/10 rounded-xl p-3">
                                <Text className="text-primary font-semibold text-center">
                                    Mở khóa ngay
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Love Section */}
                    <TouchableOpacity
                        onPress={() => router.push("/paywall" as any)}
                        className="bg-card border-2 border-border rounded-2xl overflow-hidden"
                    >
                        <View className="p-5">
                            <View className="flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center">
                                    <Heart className="text-primary mr-3" size={24} />
                                    <Text className="text-lg font-bold text-foreground">
                                        Tình yêu & Hợp đôi
                                    </Text>
                                </View>
                                <Lock className="text-muted-foreground" size={20} />
                            </View>
                            <Text className="text-muted-foreground mb-4">
                                Tìm hiểu ai là người phù hợp nhất với bạn trong tình yêu
                            </Text>
                            <View className="bg-primary/10 rounded-xl p-3">
                                <Text className="text-primary font-semibold text-center">
                                    Mở khóa ngay
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Fortune Section */}
                    <TouchableOpacity
                        onPress={() => router.push("/paywall" as any)}
                        className="bg-card border-2 border-border rounded-2xl overflow-hidden"
                    >
                        <View className="p-5">
                            <View className="flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center">
                                    <TrendingUp className="text-primary mr-3" size={24} />
                                    <Text className="text-lg font-bold text-foreground">
                                        Vận may & Dự báo
                                    </Text>
                                </View>
                                <Lock className="text-muted-foreground" size={20} />
                            </View>
                            <Text className="text-muted-foreground mb-4">
                                Ngày tốt, số may mắn và dự báo cho tháng này
                            </Text>
                            <View className="bg-primary/10 rounded-xl p-3">
                                <Text className="text-primary font-semibold text-center">
                                    Mở khóa ngay
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Premium CTA */}
                <View className="px-6 mt-8">
                    <TouchableOpacity
                        onPress={() => router.push("/paywall" as any)}
                        className="rounded-2xl overflow-hidden"
                    >
                        <LinearGradient
                            colors={["#7C3AED", "#A78BFA"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                padding: 24,
                                alignItems: "center",
                            }}
                        >
                            <Sparkles color="#FFFFFF" size={32} />
                            <Text className="text-white text-2xl font-bold mt-3 mb-2">
                                Xem phân tích đầy đủ
                            </Text>
                            <Text className="text-white/90 text-center mb-4">
                                Hiểu mình sớm hơn = ít sai lầm hơn
                            </Text>
                            <View className="bg-white/20 rounded-xl px-6 py-2">
                                <Text className="text-white font-bold">
                                    Chỉ từ 29.000đ/tháng
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Disclaimer */}
                <View className="px-6 mt-6">
                    <Text className="text-muted-foreground text-xs text-center leading-5">
                        Nội dung mang tính tham khảo và định hướng tích cực.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
