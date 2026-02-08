import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Briefcase,
    Check,
    Clock,
    Heart,
    Sparkles,
    Star,
    TrendingUp,
    X,
    Zap
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PlanType = 'monthly' | 'lifetime';

// Testimonials data
const testimonials = [
    {
        name: 'Minh Anh',
        age: 28,
        text: 'Sau khi đọc phân tích, mình hiểu mình hơn rất nhiều. Đặc biệt phần nghề nghiệp giúp mình quyết định chuyển công việc và giờ mình rất hạnh phúc!',
        rating: 5,
    },
    {
        name: 'Tuấn Khải',
        age: 32,
        text: 'Phần tình yêu hợp đôi rất chính xác! Mình và người yêu đọc xong hiểu nhau hơn, tránh được nhiều mâu thuẫn không đáng có.',
        rating: 5,
    },
    {
        name: 'Hương Giang',
        age: 25,
        text: 'Dự báo tháng này của app rất đúng. Mình làm theo lời khuyên và thật sự có nhiều may mắn hơn. Cảm ơn Thần Số Học! 💜',
        rating: 5,
    },
];

export default function PaywallScreen() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<PlanType>('lifetime');

    const plans = {
        monthly: {
            price: '29.000đ',
            period: '/tháng',
            save: null,
            popular: false,
        },
        lifetime: {
            price: '99.000đ',
            period: 'một lần',
            save: 'Tiết kiệm 70%',
            popular: true,
        },
    };

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

                {/* Hero Section */}
                <View className="px-6 mb-8">
                    <LinearGradient
                        colors={['#7C3AED', '#A78BFA', '#C4B5FD']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 24,
                            padding: 32,
                            alignItems: 'center',
                        }}
                    >
                        <Sparkles color="#FFFFFF" size={48} />
                        <Text className="text-white text-3xl font-bold mt-4 text-center">
                            Mở khóa toàn bộ{'\n'}phân tích của bạn
                        </Text>
                        <Text className="text-white/90 text-center mt-3 text-base leading-6">
                            Hiểu bản thân sâu sắc hơn{'\n'}Chọn đúng hướng đi{'\n'}Sống nhẹ đầu hơn
                        </Text>
                    </LinearGradient>
                </View>

                {/* Emotional Hook */}
                <View className="px-6 mb-8">
                    <View className="bg-accent/20 border border-accent/30 rounded-2xl p-6">
                        <Text className="text-foreground text-lg font-semibold text-center leading-7">
                            "Một quyết định sai có thể tốn của bạn hàng năm.{'\n'}
                            Hiểu mình sớm hơn = ít sai lầm hơn."
                        </Text>
                    </View>
                </View>

                {/* Pricing Plans */}
                <View className="px-6 mb-8">
                    <Text className="text-2xl font-bold text-foreground mb-4 text-center">
                        Chọn gói phù hợp
                    </Text>

                    <View className="gap-4">
                        {/* Lifetime Plan */}
                        <TouchableOpacity
                            onPress={() => setSelectedPlan('lifetime')}
                            className={`rounded-2xl overflow-hidden ${selectedPlan === 'lifetime' ? 'border-4 border-primary' : 'border-2 border-border'
                                }`}
                        >
                            {plans.lifetime.popular && (
                                <View className="bg-primary py-2">
                                    <Text className="text-white text-center font-bold text-sm">
                                        ⭐ PHỔ BIẾN NHẤT
                                    </Text>
                                </View>
                            )}
                            <View className="bg-card p-6">
                                <View className="flex-row items-center justify-between mb-3">
                                    <View>
                                        <Text className="text-2xl font-bold text-foreground">Trọn đời</Text>
                                        <Text className="text-muted-foreground">Thanh toán một lần</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-3xl font-bold text-primary">{plans.lifetime.price}</Text>
                                        <Text className="text-muted-foreground text-sm">{plans.lifetime.period}</Text>
                                    </View>
                                </View>
                                {plans.lifetime.save && (
                                    <View className="bg-primary/10 rounded-xl py-2 px-3 self-start">
                                        <Text className="text-primary font-bold text-sm">{plans.lifetime.save}</Text>
                                    </View>
                                )}
                                <View className="mt-4 pt-4 border-t border-border">
                                    <View className="flex-row items-center mb-2">
                                        <Zap className="text-primary mr-2" size={18} />
                                        <Text className="text-foreground">Không giới hạn truy cập</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Zap className="text-primary mr-2" size={18} />
                                        <Text className="text-foreground">Cập nhật miễn phí mãi mãi</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Monthly Plan */}
                        <TouchableOpacity
                            onPress={() => setSelectedPlan('monthly')}
                            className={`rounded-2xl overflow-hidden ${selectedPlan === 'monthly' ? 'border-4 border-primary' : 'border-2 border-border'
                                }`}
                        >
                            <View className="bg-card p-6">
                                <View className="flex-row items-center justify-between mb-3">
                                    <View>
                                        <Text className="text-2xl font-bold text-foreground">Hàng tháng</Text>
                                        <Text className="text-muted-foreground">Gia hạn tự động</Text>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-3xl font-bold text-foreground">{plans.monthly.price}</Text>
                                        <Text className="text-muted-foreground text-sm">{plans.monthly.period}</Text>
                                    </View>
                                </View>
                                <View className="mt-4 pt-4 border-t border-border">
                                    <View className="flex-row items-center mb-2">
                                        <Clock className="text-muted-foreground mr-2" size={18} />
                                        <Text className="text-muted-foreground">Hủy bất cứ lúc nào</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Clock className="text-muted-foreground mr-2" size={18} />
                                        <Text className="text-muted-foreground">Thanh toán hàng tháng</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Feature Comparison */}
                <View className="px-6 mb-8">
                    <Text className="text-2xl font-bold text-foreground mb-4 text-center">
                        Bạn sẽ nhận được gì?
                    </Text>

                    <View className="bg-card border border-border rounded-2xl p-5 gap-4">
                        {[
                            { icon: Sparkles, text: 'Phân tích tính cách đầy đủ', free: false },
                            { icon: Briefcase, text: 'Nghề nghiệp & Sự nghiệp phù hợp', free: false },
                            { icon: Heart, text: 'Tình yêu & Hợp đôi chi tiết', free: false },
                            { icon: TrendingUp, text: 'Dự báo vận may theo tháng/năm', free: false },
                            { icon: Star, text: 'Ngày tốt & Số may mắn', free: false },
                            { icon: Zap, text: 'Tin nhắn động viên hàng ngày', free: false },
                        ].map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <View key={index} className="flex-row items-center">
                                    <View className="bg-primary/10 rounded-full p-2 mr-3">
                                        <Icon className="text-primary" size={20} />
                                    </View>
                                    <Text className="text-foreground flex-1 text-base">{feature.text}</Text>
                                    <Check className="text-primary" size={24} />
                                </View>
                            );
                        })}
                    </View>

                    {/* Free vs Premium comparison */}
                    <View className="mt-6 bg-muted/50 rounded-2xl p-5">
                        <Text className="text-center text-muted-foreground font-semibold mb-4">
                            So với bản miễn phí:
                        </Text>
                        <View className="flex-row justify-around">
                            <View className="items-center">
                                <X className="text-destructive mb-2" size={32} />
                                <Text className="text-muted-foreground text-center text-sm">Miễn phí</Text>
                                <Text className="text-foreground font-bold text-center mt-1">3 tính cách</Text>
                            </View>
                            <View className="items-center">
                                <Check className="text-primary mb-2" size={32} />
                                <Text className="text-primary text-center text-sm">Premium</Text>
                                <Text className="text-foreground font-bold text-center mt-1">Toàn bộ</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Testimonials */}
                <View className="px-6 mb-8">
                    <Text className="text-2xl font-bold text-foreground mb-4 text-center">
                        Người dùng nói gì?
                    </Text>

                    <View className="gap-4">
                        {testimonials.map((testimonial, index) => (
                            <View key={index} className="bg-card border border-border rounded-2xl p-5">
                                <View className="flex-row mb-3">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-primary" size={16} fill="#7C3AED" />
                                    ))}
                                </View>
                                <Text className="text-foreground leading-6 mb-3">
                                    "{testimonial.text}"
                                </Text>
                                <View className="flex-row items-center">
                                    <View className="bg-primary/10 rounded-full w-10 h-10 items-center justify-center mr-3">
                                        <Text className="text-primary font-bold">
                                            {testimonial.name.charAt(0)}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text className="text-foreground font-semibold">{testimonial.name}</Text>
                                        <Text className="text-muted-foreground text-sm">{testimonial.age} tuổi</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Trust Badges */}
                <View className="px-6 mb-8">
                    <View className="bg-accent/20 border border-accent/30 rounded-2xl p-5">
                        <View className="flex-row items-center justify-around">
                            <View className="items-center">
                                <Text className="text-3xl font-bold text-primary">10K+</Text>
                                <Text className="text-muted-foreground text-sm text-center">Người dùng</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-3xl font-bold text-primary">4.8⭐</Text>
                                <Text className="text-muted-foreground text-sm text-center">Đánh giá</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-3xl font-bold text-primary">99%</Text>
                                <Text className="text-muted-foreground text-sm text-center">Hài lòng</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Money Back Guarantee */}
                <View className="px-6 mb-8">
                    <View className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-5">
                        <Text className="text-center text-primary font-bold text-lg mb-2">
                            🛡️ Đảm bảo hoàn tiền 100%
                        </Text>
                        <Text className="text-center text-foreground">
                            Không hài lòng? Hoàn tiền trong 7 ngày, không cần lý do.
                        </Text>
                    </View>
                </View>

                {/* CTA Button */}
                <View className="px-6">
                    <TouchableOpacity className="rounded-2xl overflow-hidden">
                        <LinearGradient
                            colors={['#7C3AED', '#A78BFA']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                padding: 20,
                                alignItems: 'center',
                            }}
                        >
                            <Text className="text-white text-xl font-bold mb-1">
                                {selectedPlan === 'lifetime' ? 'Mua trọn đời - 99.000đ' : 'Đăng ký - 29.000đ/tháng'}
                            </Text>
                            <Text className="text-white/90 text-sm">
                                {selectedPlan === 'lifetime' ? 'Thanh toán một lần, sử dụng mãi mãi' : 'Hủy bất cứ lúc nào'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Alternative payment methods */}
                    <View className="mt-4 flex-row items-center justify-center gap-3">
                        <Text className="text-muted-foreground text-sm">Thanh toán qua:</Text>
                        <View className="flex-row gap-2">
                            <View className="bg-card border border-border rounded-lg px-3 py-1">
                                <Text className="text-foreground font-semibold text-xs">Momo</Text>
                            </View>
                            <View className="bg-card border border-border rounded-lg px-3 py-1">
                                <Text className="text-foreground font-semibold text-xs">ZaloPay</Text>
                            </View>
                            <View className="bg-card border border-border rounded-lg px-3 py-1">
                                <Text className="text-foreground font-semibold text-xs">VNPay</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Final Disclaimer */}
                <View className="px-6 mt-6">
                    <Text className="text-muted-foreground text-xs text-center leading-5">
                        Nội dung mang tính tham khảo và định hướng tích cực.{'\n'}
                        Thanh toán an toàn & bảo mật 100%
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}