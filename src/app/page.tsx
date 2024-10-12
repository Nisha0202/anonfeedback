import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button"
import { ShieldCheck, MessageSquare, UserPlus, Lock } from "lucide-react"
import Link from "next/link"

export default function Component() {


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
<Nav/>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 text-center space-y-3">
          <h1 className="text-xl lg:text-2xl font-bold">
            Share Feedback Anonymously
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Empower your team with honest, unfiltered feedback. Our platform ensures complete anonymity, fostering open communication and continuous improvement.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<ShieldCheck className="h-8 w-8 text-blue-500" />}
                title="100% Anonymous"
                description="Your identity is always protected. Share feedback without fear."
              />
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8 text-green-500" />}
                title="Real-time Feedback"
                description="Instant delivery of feedback to recipients for quick action."
              />
              <FeatureCard
                icon={<UserPlus className="h-8 w-8 text-purple-500" />}
                title="Easy Onboarding"
                description="Set up your team in minutes with our intuitive interface."
              />
              <FeatureCard
                icon={<Lock className="h-8 w-8 text-red-500" />}
                title="Secure Platform"
                description="Enterprise-grade security to keep your data safe and private."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-xs">
          <p>&copy; 2024 AnonyFeedback. All rights reserved.</p>
       
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
      {icon}
      <h3 className="mt-4 mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
