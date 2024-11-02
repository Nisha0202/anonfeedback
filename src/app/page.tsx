import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/Nav'));
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, UserPlus, TrendingUp } from "lucide-react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      <main className="flex-grow">
        <section className="container mx-auto px-2 py-24 lg:py-20 text-center mt-6 ">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl md:text-3xl font-bold min-h-8 md:h-10 lg:min-h-14
                       bg-gradient-to-r text-transparent from-rose-900 via-rose-400 to-rose-600 bg-clip-text 
                       animate-[wave-gradient_4s_ease_infinite] bg-[length:200%_200%]"
          >
            Get Feedback Anonymously
          </h1>

          <p className="hidden sm:block md:block text-sm lg:text-base text-gray-600 max-w-2xl mx-auto text-center">
            Empower yourself with honest, unfiltered feedback. Our platform helps share openly and grow continuously.
          </p>
          <p className="block sm:hidden text-sm lg:text-base text-gray-600 mx-auto text-center">
            Empower yourself with honest, unfiltered feedback.
          </p>


        </section>


        <section className="pt-8 ">
          <div className="max-w-6xl mx-auto px-4 lg:px-0">
            <h2 className="text-lg md:text-2xl font-semibold text-center mb-8 ">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<UserPlus className="size-8 text-gray-600" />}
                title="Create Your Profile"
                description="Sign up anonymously and choose a unique username for sharing."
                index="1"
              />
              <FeatureCard
                icon={<MessageCircle className="size-8 text-gray-600" />}
                title="Connect & Share"
                description="Share your public URL to receive anonymous feedback from others."
                index="2"
              />
              <FeatureCard
                icon={<TrendingUp className="size-8 text-gray-600" />}
                title="Grow & Improve"
                description="Gain insights from feedback to enhance personal and professional growth."
                index="3"
              />
            </div>
          </div>
        </section>
      </main>


      <footer className="bg-gray-100 pb-4 py-7">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p>&copy; 2024 AnonFeedback. All rights reserved.</p>

        </div>
      </footer>
    </div>
  )
}


function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: string }) {
  return (
    <Card className="transition-all bg-transparent relative duration-300 hover:shadow-lg hover:-translate-y-1 text-gray-800 ">
      <CardHeader className=' pb-0 lg:pb-2'>
        <div className="flex items-center  justify-center mb-4 mt-1 text-gray-800">
          {icon}
        </div>
        <CardTitle className="text-lg pb-1 md:text-xl font-medium text-gray-800 ">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm lg:text-base text-gray-600  pb-2 pt-0">{description}</p>
      </CardContent>
      <div className="absolute top-5 right-5 size-6 rounded-full bg-rose-100 text-rose-600 font-semibold flex items-center justify-center">
        {index}
      </div>
    </Card>
  )
}
