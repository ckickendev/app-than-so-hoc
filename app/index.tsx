import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight, Sparkles, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleCalculate = () => {
    if (day && month && year) {
      router.push({
        pathname: '/result',
        params: { name, day, month, year }
      });
    }
  };

  const isValid = day && month && year &&
    parseInt(day) >= 1 && parseInt(day) <= 31 &&
    parseInt(month) >= 1 && parseInt(month) <= 12 &&
    parseInt(year) >= 1900 && parseInt(year) <= 2024;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <View className="w-10" />
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
            <Text className="text-white text-3xl font-bold text-center mt-4">
              Thần Số Học
            </Text>
            <Text className="text-white/90 text-center mt-2 text-base">
              Khám phá con số định mệnh của bạn
            </Text>
          </LinearGradient>
        </View>

        {/* Intro Text */}
        <View className="px-6 mb-8">
          <Text className="text-2xl font-bold text-foreground text-center mb-3">
            Hiểu bản thân – Chọn đúng hướng
          </Text>
          <Text className="text-muted-foreground text-center text-base leading-6">
            Thần số học giúp bạn khám phá những điều tốt đẹp ẩn giấu bên trong,
            tìm ra con đường phù hợp với bản thân và sống nhẹ đầu hơn.
          </Text>
        </View>

        {/* Input Form */}
        <View className="px-6 gap-5">
          {/* Name Input */}
          <View>
            <View className="flex-row items-center mb-3">
              <User className="text-primary mr-2" size={20} />
              <Text className="text-base font-semibold text-foreground">
                Họ và tên (không bắt buộc)
              </Text>
            </View>
            <View className="bg-card border border-border rounded-2xl px-4 py-4">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nguyễn Văn A"
                placeholderTextColor="#A8A29E"
                className="text-foreground text-base"
              />
            </View>
          </View>

          {/* Date of Birth */}
          <View>
            <View className="flex-row items-center mb-3">
              <Calendar className="text-primary mr-2" size={20} />
              <Text className="text-base font-semibold text-foreground">
                Ngày sinh (bắt buộc) *
              </Text>
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-card border border-border rounded-2xl px-4 py-4">
                <TextInput
                  value={day}
                  onChangeText={setDay}
                  placeholder="Ngày"
                  placeholderTextColor="#A8A29E"
                  keyboardType="number-pad"
                  maxLength={2}
                  className="text-foreground text-base text-center"
                />
              </View>
              <View className="flex-1 bg-card border border-border rounded-2xl px-4 py-4">
                <TextInput
                  value={month}
                  onChangeText={setMonth}
                  placeholder="Tháng"
                  placeholderTextColor="#A8A29E"
                  keyboardType="number-pad"
                  maxLength={2}
                  className="text-foreground text-base text-center"
                />
              </View>
              <View className="flex-1 bg-card border border-border rounded-2xl px-4 py-4">
                <TextInput
                  value={year}
                  onChangeText={setYear}
                  placeholder="Năm"
                  placeholderTextColor="#A8A29E"
                  keyboardType="number-pad"
                  maxLength={4}
                  className="text-foreground text-base text-center"
                />
              </View>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={handleCalculate}
            disabled={!isValid}
            className={`mt-4 rounded-2xl overflow-hidden ${!isValid ? 'opacity-50' : ''}`}
          >
            <LinearGradient
              colors={isValid ? ['#7C3AED', '#A78BFA'] : ['#A8A29E', '#78716C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 18,
                paddingHorizontal: 24,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles color="#FFFFFF" size={20} />
              <Text className="text-white text-lg font-bold ml-2">
                Khám phá ngay
              </Text>
              <ChevronRight color="#FFFFFF" size={20} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Trust Badge */}
          <View className="bg-accent/20 rounded-2xl p-4 mt-2">
            <Text className="text-accent-foreground text-sm text-center leading-5">
              ✨ Hoàn toàn miễn phí • Kết quả ngay lập tức
            </Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View className="px-6 mt-10">
          <Text className="text-xl font-bold text-foreground mb-4">
            Bạn sẽ khám phá được gì?
          </Text>
          <View className="gap-3">
            {[
              { icon: '🎯', title: 'Số chủ đạo của bạn', desc: 'Con số định mệnh dẫn lối cuộc đời' },
              { icon: '💎', title: 'Tính cách bản thân', desc: 'Điểm mạnh và tiềm năng ẩn giấu' },
              { icon: '💼', title: 'Hướng nghiệp phù hợp', desc: 'Công việc giúp bạn tỏa sáng' },
              { icon: '❤️', title: 'Tình yêu & quan hệ', desc: 'Ai là người hợp với bạn nhất' },
            ].map((item, index) => (
              <View key={index} className="bg-card border border-border rounded-xl p-4 flex-row items-center">
                <Text className="text-3xl mr-4">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="text-foreground font-semibold text-base">{item.title}</Text>
                  <Text className="text-muted-foreground text-sm mt-1">{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View className="px-6 mt-8">
          <Text className="text-muted-foreground text-xs text-center leading-5">
            Nội dung mang tính tham khảo và định hướng tích cực.
            Thần số học là công cụ hỗ trợ bạn hiểu bản thân tốt hơn.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}