// import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button"

import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/Nav'));

export default function Component() {


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      <main className="flex-grow">
        <section className="container mx-auto px-6 py-16 lg:py-20 text-center">
        <h1 className="text-2xl lg:text-5xl md:text-3xl font-bold pt-6
  bg-gradient-to-r from-rose-900 via-rose-400 to-rose-600 bg-clip-text text-transparent
  animate-[wave-gradient_4s_ease_infinite] bg-[length:200%_200%]"
  >
  Get Feedback Anonymously
</h1>

          <p className="text-sm lg:text-base text-gray-600 pt-4 max-w-2xl mx-auto">
            Empower yourself with honest, unfiltered feedback. Our platform ensures complete anonymity, fostering open communication and continuous improvement.
          </p>
   
        </section>

        <section className="pb-12">
          <div className="container mx-auto px-6">
            <h2 className=" text-xl lg:text-2xl font-bold text-center mb-8 lg:mb-6">
              How It Works
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
              index= "1"
               
                title="Create Your Profile"
                description="Sign up and set up your anonymous profile! Choose a unique username that will appear in the link you share with others."
              />
              <FeatureCard
                   index= "2"
             
                title="Connect & Share"
                description="Send your URL to people you want to ask questions or get feedback from. Our platform guarantees complete anonymity for all feedback providers!"
              />
              <FeatureCard
                   index= "3"
               
                title="Grow & Improve"
                description="Receive genuine feedback, take a moment to reflect, and use those insights for your personal and professional growth."
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

function FeatureCard({index,  title, description }: {index: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 bg-gray-100 rounded">
    <div className=" text-green-700 font-bold text-lg" > {index}</div> 
      <h3 className="mt-2 mb-2 text-lg font-semibold ">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
