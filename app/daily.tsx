import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bell, BellOff, Heart, Moon, RefreshCw, Sparkles, Star, Sun } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Calculate daily number based on current date
function calculateDailyNumber(day: string, month: string, year: string): number {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const reduce = (num: number): number => {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    };

    const birthDay = reduce(parseInt(day));
    const birthMonth = reduce(parseInt(month));
    const birthYear = reduce(parseInt(year));
    const personalNumber = reduce(birthDay + birthMonth + birthYear);

    const todayNumber = reduce(currentDay + currentMonth + currentYear);

    return reduce(personalNumber + todayNumber);
}

// Daily messages for each number
const dailyMessages: Record<number, {
    morning: string;
    affirmation: string;
    guidance: string;
    luckyColor: string;
    luckyTime: string;
    advice: string[];
    quote: string;
}> = {
    1: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của sự khởi đầu và hành động.',
        affirmation: 'Tôi có sức mạnh để tạo ra thay đổi tích cực trong cuộc sống của mình.',
        guidance: 'Đây là thời điểm tuyệt vời để bắt đầu dự án mới hoặc đưa ra quyết định quan trọng. Hãy tin vào bản thân và dũng cảm bước tiếp.',
        luckyColor: 'Đỏ',
        luckyTime: '6:00 - 9:00 sáng',
        advice: [
            'Bắt đầu ngày với mục tiêu rõ ràng',
            'Đừng ngại đưa ra ý kiến của bạn',
            'Tập trung vào ưu tiên quan trọng nhất',
            'Tin tưởng vào trực giác của bạn',
        ],
        quote: '"Mỗi hành trình đều bắt đầu bằng một bước chân." - Lão Tử',
    },
    2: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của sự hợp tác và lắng nghe.',
        affirmation: 'Tôi tạo ra sự hài hòa trong mọi mối quan hệ của mình.',
        guidance: 'Hãy tập trung vào việc xây dựng và nuôi dưỡng mối quan hệ. Kiên nhẫn và lắng nghe sẽ mang lại kết quả tốt đẹp.',
        luckyColor: 'Cam',
        luckyTime: '2:00 - 5:00 chiều',
        advice: [
            'Lắng nghe nhiều hơn nói',
            'Hợp tác thay vì cạnh tranh',
            'Thể hiện sự biết ơn với người khác',
            'Tránh xung đột không cần thiết',
        ],
        quote: '"Một mình đi nhanh, cùng nhau đi xa." - Tục ngữ châu Phi',
    },
    3: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của niềm vui và sáng tạo.',
        affirmation: 'Tôi thể hiện bản thân một cách tự do và sáng tạo.',
        guidance: 'Hãy để trí tưởng tượng của bạn bay cao. Đây là ngày tuyệt vời để giao tiếp, học hỏi và tận hưởng cuộc sống.',
        luckyColor: 'Vàng',
        luckyTime: '11:00 sáng - 2:00 chiều',
        advice: [
            'Thể hiện sự sáng tạo của bạn',
            'Kết nối với bạn bè và đồng nghiệp',
            'Tìm niềm vui trong những điều nhỏ',
            'Chia sẻ ý tưởng của bạn',
        ],
        quote: '"Sáng tạo là trí thông minh đang vui chơi." - Albert Einstein',
    },
    4: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của kỷ luật và xây dựng.',
        affirmation: 'Tôi có kỷ luật và quyết tâm để đạt được mục tiêu của mình.',
        guidance: 'Tập trung vào công việc và trách nhiệm. Sự chăm chỉ của bạn hôm nay sẽ tạo nền tảng vững chắc cho tương lai.',
        luckyColor: 'Xanh lá',
        luckyTime: '9:00 sáng - 12:00 trưa',
        advice: [
            'Lập kế hoạch chi tiết cho ngày',
            'Hoàn thành công việc quan trọng trước',
            'Giữ không gian làm việc ngăn nắp',
            'Kiên trì với mục tiêu dài hạn',
        ],
        quote: '"Thành công là tổng của những nỗ lực nhỏ, lặp đi lặp lại mỗi ngày." - Robert Collier',
    },
    5: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của tự do và phiêu lưu.',
        affirmation: 'Tôi đón nhận thay đổi và khám phá những khả năng mới.',
        guidance: 'Hãy linh hoạt và cởi mở với những trải nghiệm mới. Thay đổi hôm nay có thể mang lại cơ hội bất ngờ.',
        luckyColor: 'Tím',
        luckyTime: '3:00 - 6:00 chiều',
        advice: [
            'Thử điều gì đó mới mẻ',
            'Giữ tâm trí cởi mở',
            'Tận dụng cơ hội bất ngờ',
            'Đừng sợ thay đổi kế hoạch',
        ],
        quote: '"Cuộc sống bắt đầu ở cuối vùng an toàn của bạn." - Neale Donald Walsch',
    },
    6: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của tình yêu và trách nhiệm.',
        affirmation: 'Tôi nuôi dưỡng bản thân và những người xung quanh với tình yêu thương.',
        guidance: 'Dành thời gian cho gia đình và người thân. Sự quan tâm và chăm sóc của bạn sẽ tạo ra sự ấm áp.',
        luckyColor: 'Hồng',
        luckyTime: '6:00 - 9:00 tối',
        advice: [
            'Dành thời gian chất lượng với người thân',
            'Thể hiện sự quan tâm và yêu thương',
            'Chăm sóc bản thân trước',
            'Tạo không gian ấm áp và hài hòa',
        ],
        quote: '"Gia đình là nơi tình yêu bắt đầu và không bao giờ kết thúc." - Unknown',
    },
    7: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của sự suy ngẫm và trí tuệ.',
        affirmation: 'Tôi tin vào trực giác và trí tuệ bên trong của mình.',
        guidance: 'Dành thời gian cho bản thân để suy ngẫm và học hỏi. Câu trả lời bạn tìm kiếm có thể đến từ bên trong.',
        luckyColor: 'Xanh dương',
        luckyTime: '5:00 - 7:00 sáng',
        advice: [
            'Dành thời gian một mình để suy ngẫm',
            'Tin vào trực giác của bạn',
            'Học hỏi điều gì đó mới',
            'Tìm kiếm ý nghĩa sâu xa',
        ],
        quote: '"Sự im lặng là người thầy vĩ đại nhất." - Lão Tử',
    },
    8: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của thành công và quyền lực.',
        affirmation: 'Tôi thu hút sự thịnh vượng và thành công vào cuộc sống của mình.',
        guidance: 'Tập trung vào mục tiêu lớn và hành động quyết đoán. Đây là ngày tuyệt vời cho những quyết định quan trọng.',
        luckyColor: 'Đen',
        luckyTime: '10:00 sáng - 1:00 chiều',
        advice: [
            'Tập trung vào mục tiêu lớn',
            'Đưa ra quyết định quan trọng',
            'Thể hiện sự tự tin và quyền lực',
            'Quản lý tài chính thông minh',
        ],
        quote: '"Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công." - Albert Schweitzer',
    },
    9: {
        morning: 'Chào buổi sáng! Hôm nay là ngày của sự hoàn thành và cho đi.',
        affirmation: 'Tôi buông bỏ quá khứ và đón nhận tương lai với tâm thế cởi mở.',
        guidance: 'Hoàn thành những gì bạn đã bắt đầu và sẵn sàng buông bỏ những gì không còn phù hợp. Giúp đỡ người khác sẽ mang lại ý nghĩa.',
        luckyColor: 'Trắng',
        luckyTime: '9:00 - 11:00 tối',
        advice: [
            'Hoàn thành công việc dang dở',
            'Buông bỏ những gì không còn phù hợp',
            'Giúp đỡ người khác',
            'Tha thứ và chữa lành',
        ],
        quote: '"Để bắt đầu điều mới, bạn phải kết thúc điều cũ." - Unknown',
    },
};

export default function DailyMessageScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { day, month, year } = params as { day: string; month: string; year: string };

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [morningNotif, setMorningNotif] = useState(true);
    const [eveningNotif, setEveningNotif] = useState(false);

    const dailyNumber = calculateDailyNumber(day, month, year);
    const message = dailyMessages[dailyNumber];

    const today = new Date();
    const dayName = today.toLocaleDateString('vi-VN', { weekday: 'long' });
    const dateStr = today.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });

    const timeOfDay = today.getHours();
    const greeting = timeOfDay < 12 ? 'Chào buổi sáng' : timeOfDay < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';
    const greetingIcon = timeOfDay < 18 ? Sun : Moon;

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-border">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft className="text-foreground" size={24} />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-foreground">Lời Nhắn Hôm Nay</Text>
                <ThemeToggle />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
                {/* Greeting Card */}
                <View className="px-6 py-8">
                    <LinearGradient
                        colors={['#7C3AED', '#A78BFA', '#C4B5FD']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 24, padding: 32, alignItems: 'center' }}
                    >
                        {React.createElement(greetingIcon, { color: '#FFFFFF', size: 56 })}
                        <Text className="text-white text-2xl font-bold mt-4 text-center">{greeting}!</Text>
                        <Text className="text-white/90 text-center mt-2 capitalize">{dayName}</Text>
                        <Text className="text-white/80 text-center text-sm mt-1">{dateStr}</Text>

                        <View className="mt-6 bg-white/20 rounded-2xl px-6 py-4">
                            <Text className="text-white/90 text-center text-sm mb-2">Số may mắn hôm nay</Text>
                            <Text className="text-white text-6xl font-bold text-center">{dailyNumber}</Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Morning Message */}
                <View className="px-6 mb-6">
                    <View className="bg-card rounded-2xl p-6 border border-border">
                        <View className="flex-row items-center mb-3">
                            <Sparkles className="text-primary mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">Thông Điệp</Text>
                        </View>
                        <Text className="text-foreground leading-6">{message.morning}</Text>
                    </View>
                </View>

                {/* Affirmation */}
                <View className="px-6 mb-6">
                    <LinearGradient
                        colors={['#EC4899', '#F472B6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 20, padding: 24 }}
                    >
                        <View className="flex-row items-center mb-3">
                            <Heart color="#FFFFFF" size={20} />
                            <Text className="text-white text-lg font-bold ml-2">Khẳng Định Tích Cực</Text>
                        </View>
                        <Text className="text-white text-lg leading-7 italic">"{message.affirmation}"</Text>
                    </LinearGradient>
                </View>

                {/* Guidance */}
                <View className="px-6 mb-6">
                    <View className="bg-accent/20 rounded-2xl p-6 border border-accent/30">
                        <View className="flex-row items-center mb-3">
                            <Star className="text-accent-foreground mr-2" size={20} />
                            <Text className="text-lg font-bold text-foreground">Hướng Dẫn Cho Hôm Nay</Text>
                        </View>
                        <Text className="text-foreground leading-6">{message.guidance}</Text>
                    </View>
                </View>

                {/* Lucky Details */}
                <View className="px-6 mb-6">
                    <View className="flex-row gap-3">
                        <View className="flex-1 bg-card rounded-xl p-4 border border-border">
                            <Text className="text-muted-foreground text-sm mb-1">Màu may mắn</Text>
                            <Text className="text-foreground font-bold text-lg">{message.luckyColor}</Text>
                        </View>
                        <View className="flex-1 bg-card rounded-xl p-4 border border-border">
                            <Text className="text-muted-foreground text-sm mb-1">Giờ vàng</Text>
                            <Text className="text-foreground font-bold text-base">{message.luckyTime}</Text>
                        </View>
                    </View>
                </View>

                {/* Daily Advice */}
                <View className="px-6 mb-6">
                    <Text className="text-xl font-bold text-foreground mb-4">Lời Khuyên Hôm Nay</Text>
                    <View className="gap-3">
                        {message.advice.map((tip, index) => (
                            <View key={index} className="bg-primary/10 rounded-xl p-4 border border-primary/20 flex-row items-start">
                                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mr-3 mt-0.5">
                                    <Text className="text-primary-foreground text-xs font-bold">{index + 1}</Text>
                                </View>
                                <Text className="flex-1 text-foreground leading-6">{tip}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Quote */}
                <View className="px-6 mb-6">
                    <View className="bg-muted rounded-2xl p-6">
                        <Text className="text-foreground text-center italic leading-6">{message.quote}</Text>
                    </View>
                </View>

                {/* Notification Settings */}
                <View className="px-6 mb-6">
                    <Text className="text-xl font-bold text-foreground mb-4">Nhận Lời Nhắn Hàng Ngày</Text>

                    <View className="bg-card rounded-2xl border border-border overflow-hidden">
                        {/* Enable Notifications */}
                        <View className="p-5 flex-row items-center justify-between border-b border-border">
                            <View className="flex-row items-center flex-1">
                                {notificationsEnabled ? (
                                    <Bell className="text-primary mr-3" size={24} />
                                ) : (
                                    <BellOff className="text-muted-foreground mr-3" size={24} />
                                )}
                                <View className="flex-1">
                                    <Text className="text-foreground font-semibold">Bật thông báo</Text>
                                    <Text className="text-muted-foreground text-sm mt-1">
                                        Nhận lời nhắn động viên mỗi ngày
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: '#E7E5E4', true: '#A78BFA' }}
                                thumbColor={notificationsEnabled ? '#7C3AED' : '#F5F5F4'}
                            />
                        </View>

                        {notificationsEnabled && (
                            <>
                                {/* Morning Notification */}
                                <View className="p-5 flex-row items-center justify-between border-b border-border">
                                    <View className="flex-row items-center flex-1">
                                        <Sun className="text-primary mr-3" size={20} />
                                        <View className="flex-1">
                                            <Text className="text-foreground font-medium">Buổi sáng</Text>
                                            <Text className="text-muted-foreground text-sm mt-1">7:00 AM</Text>
                                        </View>
                                    </View>
                                    <Switch
                                        value={morningNotif}
                                        onValueChange={setMorningNotif}
                                        trackColor={{ false: '#E7E5E4', true: '#A78BFA' }}
                                        thumbColor={morningNotif ? '#7C3AED' : '#F5F5F4'}
                                    />
                                </View>

                                {/* Evening Notification */}
                                <View className="p-5 flex-row items-center justify-between">
                                    <View className="flex-row items-center flex-1">
                                        <Moon className="text-primary mr-3" size={20} />
                                        <View className="flex-1">
                                            <Text className="text-foreground font-medium">Buổi tối</Text>
                                            <Text className="text-muted-foreground text-sm mt-1">9:00 PM</Text>
                                        </View>
                                    </View>
                                    <Switch
                                        value={eveningNotif}
                                        onValueChange={setEveningNotif}
                                        trackColor={{ false: '#E7E5E4', true: '#A78BFA' }}
                                        thumbColor={eveningNotif ? '#7C3AED' : '#F5F5F4'}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>

                {/* Refresh Button */}
                <View className="px-6">
                    <TouchableOpacity>
                        <View className="bg-muted rounded-xl p-4 flex-row items-center justify-center">
                            <RefreshCw className="text-muted-foreground mr-2" size={20} />
                            <Text className="text-muted-foreground font-semibold">Làm mới lời nhắn</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Info Footer */}
                <View className="px-6 mt-8">
                    <Text className="text-muted-foreground text-xs text-center leading-5">
                        Lời nhắn được cập nhật mỗi ngày dựa trên số chủ đạo và chu kỳ thời gian của bạn.
                        Hãy bắt đầu ngày mới với năng lượng tích cực!
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}