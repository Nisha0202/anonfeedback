// import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button"
import { User, Star, ExternalLink } from "lucide-react"
import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/Nav'));

export default function Component() {


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 lg:py-18 text-center space-y-3">
          <h1 className="text-xl lg:text-2xl font-bold">
            Share Feedback Anonymously
          </h1>
          <p className="text-sm lg:text-base text-gray-600 pb-8 max-w-2xl mx-auto">
            Empower yourself with honest, unfiltered feedback. Our platform ensures complete anonymity, fostering open communication and continuous improvement.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="text-sm font-medium rounded-sm hover:bg-rose-500">Get Started</Button>
            <Button variant="outline" className="text-sm font-medium rounded-sm">
              Learn More
            </Button>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-center mb-6">
              How It Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
              index= "1"
                icon={<User className="h-6 w-8 text-blue-500" />}
                title="Create Your Profile"
                description="Sign up and set up your anonymous profile! Choose a unique username that will appear in the link you share with others."
              />
              <FeatureCard
                   index= "2"
                icon={<ExternalLink className="h-6 w-6 text-green-500" />}
                title="Connect & Share"
                description="Send your URL to people you want to ask questions or get feedback from. Our platform guarantees complete anonymity for all feedback providers!"
              />
              <FeatureCard
                   index= "3"
                icon={<Star className="h-6 w-6 text-purple-500" />}
                title="Grow & Improve"
                description="Receive genuine feedback, take a moment to reflect, and use those insights for your personal and professional growth."
              />
            </div>


          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-xs">
          <p>&copy; 2024 AnonFeedback. All rights reserved.</p>

        </div>
      </footer>
    </div>
  )
}

function FeatureCard({index, icon, title, description }: {index: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg">
    <div className=" text-green-700 font-bold text-lg" > {index}</div> 
      <h3 className="mt-2 mb-2 text-xl font-semibold ">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
