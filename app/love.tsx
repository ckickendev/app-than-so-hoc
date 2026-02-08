import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertTriangle, ChevronRight, Heart, Sparkles, TrendingUp, Users } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const loveData: Record<string, {
    loveStyle: string;
    compatibility: { number: number; match: string; description: string }[];
    relationshipPatterns: string[];
    redFlags: string[];
    adviceForLove: string[];
}> = {
    '1': {
        loveStyle: 'Bạn yêu mạnh mẽ, quyết đoán và thích dẫn dắt. Bạn cần một người bạn đời tôn trọng sự độc lập của bạn nhưng cũng đủ mạnh mẽ để đứng bên cạnh bạn.',
        compatibility: [
            { number: 3, match: 'Tuyệt vời', description: 'Số 3 mang lại niềm vui và sự sáng tạo, cân bằng với tính nghiêm túc của bạn.' },
            { number: 5, match: 'Tốt', description: 'Số 5 yêu tự do như bạn, tạo nên mối quan hệ năng động.' },
            { number: 2, match: 'Trung bình', description: 'Số 2 quá nhạy cảm, có thể bị tổn thương bởi sự quyết đoán của bạn.' },
        ],
        relationshipPatterns: [
            'Thích chủ động trong mọi quyết định',
            'Cần không gian riêng và sự tự do',
            'Thể hiện tình yêu qua hành động hơn lời nói',
            'Đôi khi quá tập trung vào sự nghiệp, bỏ bê tình cảm',
        ],
        redFlags: [
            'Người yêu quá phụ thuộc hoặc thiếu tự tin',
            'Không tôn trọng ranh giới cá nhân của bạn',
            'Cố gắng kiểm soát hoặc thay đổi bạn',
            'Thiếu tham vọng hoặc mục tiêu rõ ràng',
        ],
        adviceForLove: [
            'Học cách lắng nghe và thể hiện cảm xúc nhiều hơn',
            'Đừng để công việc lấn át thời gian cho người yêu',
            'Tôn trọng ý kiến của đối phương, đừng áp đặt',
            'Thể hiện sự trân trọng và lòng biết ơn thường xuyên',
        ],
    },
    '2': {
        loveStyle: 'Bạn là người yêu sâu sắc, nhạy cảm và luôn đặt nhu cầu của người khác lên trước. Bạn cần một mối quan hệ hài hòa, an toàn và đầy sự thấu hiểu.',
        compatibility: [
            { number: 6, match: 'Tuyệt vời', description: 'Số 6 yêu thương và chăm sóc như bạn, tạo mối quan hệ ấm áp.' },
            { number: 4, match: 'Tốt', description: 'Số 4 mang lại sự ổn định và an toàn mà bạn khao khát.' },
            { number: 8, match: 'Trung bình', description: 'Số 8 quá tập trung vào vật chất, có thể làm bạn cảm thấy bị bỏ bê.' },
        ],
        relationshipPatterns: [
            'Luôn cố gắng làm hài lòng đối phương',
            'Rất nhạy cảm với lời nói và hành động',
            'Cần sự đảm bảo và xác nhận thường xuyên',
            'Tránh xung đột, đôi khi ép mình chịu đựng',
        ],
        redFlags: [
            'Người yêu thô lỗ hoặc thiếu tế nhị',
            'Không trân trọng sự hy sinh của bạn',
            'Tạo ra xung đột hoặc drama không cần thiết',
            'Thiếu cam kết hoặc không nghiêm túc',
        ],
        adviceForLove: [
            'Đừng quên chăm sóc bản thân, không chỉ người khác',
            'Học cách nói "không" khi cần thiết',
            'Thể hiện nhu cầu của mình một cách rõ ràng',
            'Tìm người biết trân trọng và đáp lại tình cảm của bạn',
        ],
    },
    '3': {
        loveStyle: 'Bạn yêu bằng sự vui vẻ, sáng tạo và nhiệt huyết. Bạn cần một người bạn đời có thể cười đùa, khám phá cuộc sống và giữ cho tình yêu luôn tươi mới.',
        compatibility: [
            { number: 1, match: 'Tuyệt vời', description: 'Số 1 mạnh mẽ, quyết đoán, bổ sung cho tính vui vẻ của bạn.' },
            { number: 5, match: 'Tốt', description: 'Số 5 yêu tự do và phiêu lưu như bạn, tạo mối quan hệ sôi động.' },
            { number: 4, match: 'Trung bình', description: 'Số 4 quá nghiêm túc và khuôn mẫu, có thể làm bạn cảm thấy bị gò bó.' },
        ],
        relationshipPatterns: [
            'Thích bất ngờ và sự mới mẻ',
            'Thể hiện tình yêu qua lời nói và hành động sáng tạo',
            'Cần không gian để thể hiện bản thân',
            'Dễ chán nếu mối quan hệ trở nên nhàm chán',
        ],
        redFlags: [
            'Người yêu quá nghiêm túc hoặc thiếu hài hước',
            'Kiểm soát hoặc hạn chế sự tự do của bạn',
            'Không đánh giá cao tài năng và sự sáng tạo của bạn',
            'Thiếu sự nhiệt tình và năng lượng tích cực',
        ],
        adviceForLove: [
            'Đừng chỉ tập trung vào vui chơi, hãy nghiêm túc khi cần',
            'Học cách lắng nghe và thấu hiểu sâu sắc hơn',
            'Cam kết và kiên nhẫn với mối quan hệ dài hạn',
            'Cân bằng giữa tự do cá nhân và trách nhiệm đôi lứa',
        ],
    },
    '4': {
        loveStyle: 'Bạn yêu một cách nghiêm túc, trung thành và cam kết. Bạn cần một mối quan hệ ổn định, đáng tin cậy và xây dựng trên nền tảng vững chắc.',
        compatibility: [
            { number: 2, match: 'Tuyệt vời', description: 'Số 2 nhạy cảm và hài hòa, tạo sự cân bằng cho tính thực tế của bạn.' },
            { number: 8, match: 'Tốt', description: 'Số 8 có tham vọng và kỷ luật như bạn, xây dựng tương lai vững chắc.' },
            { number: 5, match: 'Trung bình', description: 'Số 5 quá tự do và thay đổi, làm bạn cảm thấy thiếu an toàn.' },
        ],
        relationshipPatterns: [
            'Cần thời gian để mở lòng và tin tưởng',
            'Thể hiện tình yêu qua hành động thực tế',
            'Đánh giá cao sự trung thành và cam kết',
            'Thích lập kế hoạch và xây dựng tương lai chung',
        ],
        redFlags: [
            'Người yêu thiếu trách nhiệm hoặc không đáng tin',
            'Thay đổi ý kiến thường xuyên, thiếu ổn định',
            'Không nghiêm túc với cam kết dài hạn',
            'Quá phóng khoáng hoặc bốc đồng',
        ],
        adviceForLove: [
            'Đừng quá cứng nhắc, hãy linh hoạt hơn',
            'Học cách thể hiện cảm xúc, không chỉ hành động',
            'Tạo không gian cho sự tự phát và bất ngờ',
            'Tin tưởng và buông bỏ nhu cầu kiểm soát mọi thứ',
        ],
    },
    '5': {
        loveStyle: 'Bạn yêu tự do, phiêu lưu và đa dạng. Bạn cần một người bạn đời hiểu và tôn trọng nhu cầu khám phá của bạn, đồng thời đủ thú vị để giữ chân bạn.',
        compatibility: [
            { number: 1, match: 'Tuyệt vời', description: 'Số 1 độc lập và mạnh mẽ, không gò bó bạn.' },
            { number: 3, match: 'Tốt', description: 'Số 3 vui vẻ và sáng tạo, tạo mối quan hệ đầy năng lượng.' },
            { number: 4, match: 'Trung bình', description: 'Số 4 quá khuôn mẫu và nghiêm túc, làm bạn cảm thấy bị gò bó.' },
        ],
        relationshipPatterns: [
            'Cần không gian và tự do cá nhân',
            'Thích khám phá và trải nghiệm mới cùng nhau',
            'Dễ chán nếu mối quan hệ trở nên nhàm chán',
            'Thể hiện tình yêu qua những cuộc phiêu lưu chung',
        ],
        redFlags: [
            'Người yêu quá ghen tuông hoặc kiểm soát',
            'Không cho bạn không gian riêng',
            'Quá nhàm chán hoặc thiếu sự phấn khích',
            'Đòi hỏi cam kết quá sớm hoặc quá nặng nề',
        ],
        adviceForLove: [
            'Học cách cam kết và kiên nhẫn với mối quan hệ',
            'Đừng chạy trốn khi gặp khó khăn',
            'Cân bằng giữa tự do và trách nhiệm đôi lứa',
            'Tìm người cùng chí hướng, không phải người gò bó bạn',
        ],
    },
    '6': {
        loveStyle: 'Bạn yêu bằng cả trái tim, luôn chăm sóc và hi sinh cho người mình yêu. Bạn cần một mối quan hệ hài hòa, ấm áp và đầy trách nhiệm.',
        compatibility: [
            { number: 2, match: 'Tuyệt vời', description: 'Số 2 nhạy cảm và hài hòa, tạo mối quan hệ lý tưởng.' },
            { number: 9, match: 'Tốt', description: 'Số 9 nhân ái và rộng lượng như bạn, cùng xây dựng tình yêu đẹp.' },
            { number: 5, match: 'Trung bình', description: 'Số 5 quá tự do, có thể làm bạn cảm thấy thiếu cam kết.' },
        ],
        relationshipPatterns: [
            'Luôn đặt nhu cầu của người yêu lên trước',
            'Tạo không gian ấm áp và hài hòa cho gia đình',
            'Thể hiện tình yêu qua việc chăm sóc và phục vụ',
            'Cần được trân trọng và đáp lại tình cảm',
        ],
        redFlags: [
            'Người yêu ích kỷ hoặc không biết trân trọng',
            'Lợi dụng sự tốt bụng của bạn',
            'Không cam kết hoặc thiếu trách nhiệm',
            'Tạo ra xung đột hoặc thiếu hài hòa',
        ],
        adviceForLove: [
            'Đừng hy sinh quá mức, hãy chăm sóc bản thân',
            'Học cách nói "không" khi cần thiết',
            'Tìm người biết trân trọng và đáp lại tình yêu của bạn',
            'Cân bằng giữa cho đi và nhận lại',
        ],
    },
    '7': {
        loveStyle: 'Bạn yêu sâu sắc, trí tuệ và tinh thần. Bạn cần một người bạn đời hiểu và tôn trọng nhu cầu riêng tư của bạn, đồng thời có thể kết nối ở tầng sâu.',
        compatibility: [
            { number: 4, match: 'Tuyệt vời', description: 'Số 4 ổn định và đáng tin, tạo nền tảng an toàn cho bạn.' },
            { number: 9, match: 'Tốt', description: 'Số 9 sâu sắc và tinh thần như bạn, hiểu nhau ở tầng cao.' },
            { number: 3, match: 'Trung bình', description: 'Số 3 quá ồn ào và xã hội, làm bạn cảm thấy mệt mỏi.' },
        ],
        relationshipPatterns: [
            'Cần thời gian một mình để suy ngẫm',
            'Thích giao tiếp sâu sắc hơn là xã giao',
            'Đánh giá cao sự thông minh và tinh thần',
            'Chậm mở lòng nhưng rất trung thành khi tin tưởng',
        ],
        redFlags: [
            'Người yêu quá nông cạn hoặc thiếu chiều sâu',
            'Không tôn trọng nhu cầu riêng tư của bạn',
            'Quá xã hội hoặc ồn ào',
            'Thiếu sự tò mò trí tuệ hoặc tâm linh',
        ],
        adviceForLove: [
            'Đừng quá khép kín, hãy mở lòng nhiều hơn',
            'Thể hiện cảm xúc, không chỉ suy nghĩ',
            'Cân bằng giữa thời gian riêng và thời gian chung',
            'Tìm người hiểu và tôn trọng sự khác biệt của bạn',
        ],
    },
    '8': {
        loveStyle: 'Bạn yêu mạnh mẽ, đam mê và có tham vọng. Bạn cần một người bạn đời có thể đồng hành trong sự nghiệp và xây dựng đế chế chung.',
        compatibility: [
            { number: 4, match: 'Tuyệt vời', description: 'Số 4 kỷ luật và ổn định, bổ sung cho tham vọng của bạn.' },
            { number: 2, match: 'Tốt', description: 'Số 2 hỗ trợ và thấu hiểu, tạo sự cân bằng cho bạn.' },
            { number: 7, match: 'Trung bình', description: 'Số 7 quá nội tâm và tinh thần, khác biệt với tính vật chất của bạn.' },
        ],
        relationshipPatterns: [
            'Đặt sự nghiệp và thành công lên hàng đầu',
            'Thể hiện tình yêu qua quà tặng và hành động vật chất',
            'Cần người bạn đời mạnh mẽ và tự tin',
            'Đánh giá cao sự tham vọng và quyết tâm',
        ],
        redFlags: [
            'Người yêu thiếu tham vọng hoặc lười biếng',
            'Quá phụ thuộc về tài chính hoặc cảm xúc',
            'Không hỗ trợ mục tiêu sự nghiệp của bạn',
            'Ghen tị với thành công của bạn',
        ],
        adviceForLove: [
            'Đừng để công việc lấn át tình cảm',
            'Thể hiện tình yêu bằng thời gian, không chỉ tiền bạc',
            'Học cách cân bằng giữa sự nghiệp và gia đình',
            'Tìm người có tham vọng nhưng cũng biết yêu thương',
        ],
    },
    '9': {
        loveStyle: 'Bạn yêu rộng lượng, nhân ái và vô điều kiện. Bạn cần một người bạn đời có tầm nhìn rộng, hiểu và chia sẻ sứ mệnh nhân đạo của bạn.',
        compatibility: [
            { number: 6, match: 'Tuyệt vời', description: 'Số 6 chăm sóc và yêu thương như bạn, tạo mối quan hệ đẹp.' },
            { number: 3, match: 'Tốt', description: 'Số 3 vui vẻ và sáng tạo, mang lại niềm vui cho bạn.' },
            { number: 5, match: 'Trung bình', description: 'Số 5 quá tập trung vào bản thân, thiếu tầm nhìn chung.' },
        ],
        relationshipPatterns: [
            'Yêu mọi người, đôi khi quên chăm sóc bản thân',
            'Thể hiện tình yêu qua việc giúp đỡ người khác',
            'Cần người bạn đời hiểu và hỗ trợ sứ mệnh của bạn',
            'Đánh giá cao sự rộng lượng và lòng tốt',
        ],
        redFlags: [
            'Người yêu ích kỷ hoặc thiếu lòng nhân ái',
            'Không hiểu hoặc hỗ trợ sứ mệnh của bạn',
            'Ghen tị với thời gian bạn dành cho người khác',
            'Quá vật chất hoặc thiếu tinh thần',
        ],
        adviceForLove: [
            'Đừng quên chăm sóc bản thân và người yêu',
            'Học cách cân bằng giữa cho đi và nhận lại',
            'Tìm người cùng tầm nhìn và giá trị',
            'Đặt ranh giới để bảo vệ năng lượng của mình',
        ],
    },
};

export default function LoveCompatibilityScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const lifePathNumber = params.number || '1';
    const data = loveData[lifePathNumber as string] || loveData['1'];

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="text-primary text-base font-semibold">← Quay lại</Text>
                    </TouchableOpacity>
                    <ThemeToggle />
                </View>

                {/* Hero Section */}
                <View className="px-6 mb-6">
                    <LinearGradient
                        colors={['#EC4899', '#F472B6', '#FBCFE8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 24, padding: 32, alignItems: 'center' }}
                    >
                        <Heart color="#FFFFFF" size={48} />
                        <Text className="text-white text-3xl font-bold text-center mt-4">
                            Tình Yêu & Hòa Hợp
                        </Text>
                        <Text className="text-white/90 text-center mt-2 text-base">
                            Số chủ đạo {lifePathNumber}
                        </Text>
                    </LinearGradient>
                </View>

                {/* Love Style */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Sparkles className="text-primary mr-2" size={24} />
                        <Text className="text-xl font-bold text-foreground">Phong cách yêu của bạn</Text>
                    </View>
                    <View className="bg-card border border-border rounded-2xl p-5">
                        <Text className="text-foreground leading-6">{data.loveStyle}</Text>
                    </View>
                </View>

                {/* Compatibility */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Users className="text-primary mr-2" size={24} />
                        <Text className="text-xl font-bold text-foreground">Độ hòa hợp với số khác</Text>
                    </View>
                    <View className="gap-3">
                        {data.compatibility.map((comp, index) => (
                            <View key={index} className="bg-card border border-border rounded-2xl p-4">
                                <View className="flex-row items-center justify-between mb-2">
                                    <View className="flex-row items-center">
                                        <View className="bg-primary/10 rounded-full w-10 h-10 items-center justify-center mr-3">
                                            <Text className="text-primary font-bold text-lg">{comp.number}</Text>
                                        </View>
                                        <Text className="text-foreground font-semibold text-base">Số {comp.number}</Text>
                                    </View>
                                    <View className={`px-3 py-1 rounded-full ${comp.match === 'Tuyệt vời' ? 'bg-green-500/20' :
                                            comp.match === 'Tốt' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                                        }`}>
                                        <Text className={`font-semibold text-sm ${comp.match === 'Tuyệt vời' ? 'text-green-600' :
                                                comp.match === 'Tốt' ? 'text-blue-600' : 'text-yellow-600'
                                            }`}>{comp.match}</Text>
                                    </View>
                                </View>
                                <Text className="text-muted-foreground text-sm leading-5">{comp.description}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Relationship Patterns */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Heart className="text-primary mr-2" size={24} />
                        <Text className="text-xl font-bold text-foreground">Cách bạn yêu</Text>
                    </View>
                    <View className="bg-card border border-border rounded-2xl p-5 gap-3">
                        {data.relationshipPatterns.map((pattern, index) => (
                            <View key={index} className="flex-row items-start">
                                <Text className="text-primary mr-2">•</Text>
                                <Text className="flex-1 text-foreground leading-6">{pattern}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Red Flags */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <AlertTriangle className="text-destructive mr-2" size={24} />
                        <Text className="text-xl font-bold text-foreground">Cảnh báo - Red Flags</Text>
                    </View>
                    <View className="bg-destructive/10 border border-destructive/30 rounded-2xl p-5 gap-3">
                        {data.redFlags.map((flag, index) => (
                            <View key={index} className="flex-row items-start">
                                <AlertTriangle className="text-destructive mr-2 mt-0.5" size={16} />
                                <Text className="flex-1 text-foreground leading-6">{flag}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Advice for Love */}
                <View className="px-6 mb-6">
                    <View className="flex-row items-center mb-3">
                        <Sparkles className="text-primary mr-2" size={24} />
                        <Text className="text-xl font-bold text-foreground">Lời khuyên cho tình yêu</Text>
                    </View>
                    <View className="gap-3">
                        {data.adviceForLove.map((advice, index) => (
                            <View key={index} className="bg-accent/20 border border-accent/30 rounded-xl p-4 flex-row items-start">
                                <Text className="text-accent-foreground mr-2 font-bold">{index + 1}.</Text>
                                <Text className="flex-1 text-accent-foreground leading-6">{advice}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* CTA Section */}
                <View className="px-6 mb-6">
                    <LinearGradient
                        colors={['#EC4899', '#F472B6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ borderRadius: 20, padding: 24 }}
                    >
                        <Text className="text-white text-xl font-bold mb-3">Khám phá thêm</Text>

                        <TouchableOpacity onPress={() => router.push(`/analysis?number=${lifePathNumber}`)}>
                            <View className="bg-white/20 rounded-xl p-4 flex-row items-center justify-between mb-3">
                                <View className="flex-row items-center flex-1">
                                    <Sparkles color="#FFFFFF" size={20} />
                                    <Text className="text-white font-semibold ml-3">Phân tích đầy đủ</Text>
                                </View>
                                <ChevronRight color="#FFFFFF" size={20} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push(`/career?number=${lifePathNumber}`)}>
                            <View className="bg-white/20 rounded-xl p-4 flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <TrendingUp color="#FFFFFF" size={20} />
                                    <Text className="text-white font-semibold ml-3">Sự nghiệp & Tiền bạc</Text>
                                </View>
                                <ChevronRight color="#FFFFFF" size={20} />
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}