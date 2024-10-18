import dynamic from 'next/dynamic';
const Nav = dynamic(() => import('@/components/Nav'));

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      <main className="flex-grow">
        <section className="container mx-auto px-6 py-12 lg:py-20 text-center mt-6">
          <h1 className="text-xl lg:text-5xl md:text-3xl font-bold h-8 md:h-10 lg:h-14
                       bg-gradient-to-r text-transparent from-rose-900 via-rose-400 to-rose-600 bg-clip-text 
                       animate-[wave-gradient_4s_ease_infinite] bg-[length:200%_200%]"
          >
            Get Feedback Anonymously
          </h1>

          <p className="hidden md:block text-sm lg:text-base text-gray-600 max-w-2xl mx-auto text-center">
            Empower yourself with honest, unfiltered feedback. Our platform helps share openly and grow continuously.
          </p>
          <p className="block md:hidden text-sm lg:text-base text-gray-600 mx-auto text-center">
            Empower yourself with honest, unfiltered feedback.
          </p>


        </section>

        <section className="pb-12 pt-4">
          <div className="container mx-auto px-6">
            <h2 className=" text-lg lg:text-2xl font-medium text-center mb-4 lg:mb-6">
              How It Works
            </h2>
            <div className="grid gap-6 lg:gap-10 lg:grid-cols-3 ">
              <FeatureCard
                index="1"
                title="Create Your Profile"
                description="Sign up anonymously and choose a unique username for sharing."
              />
              <FeatureCard
                index="2"
                title="Connect & Share"
                description="Share your public URL to receive anonymous feedback from others."
              />
              <FeatureCard
                index="3"
                title="Grow & Improve"
                description="Gain insights from feedback to enhance personal and professional growth."
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

function FeatureCard({ index, title, description }: { index: string; title: string; description: string }) {
  return (

    <div className="flex flex-col lg:gap-3 gap-2 max-w-sm mx-auto items-center text-center border-2 m-2 p-10 rounded-sm transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <div className="">
          <h3 className="lg:text-lg text-base font-medium ">{title}</h3>
        </div>
        <div className="absolute top-0 right-0 -mr-4 border-2  -mt-2 w-5 h-5 rounded-full font-semibold text-sm text-rose-600  flex items-center justify-center">
          {index}
        </div>
      </div>

      <p className="text-gray-600 text-sm px-3">{description}</p>
    </div>

  )
}
