import React from "react";
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LandingNavbar from '../components/landingnavbar';
import Slideshow from "../components/slideshow.jsx";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const studentImage = '/img/studentImage1.jpeg';


const LandingPage = () => {
    return (
        <div className="bg-gray-900 text-gray-100 font-sans">
            <LandingNavbar />

            {/* Hero Section */}
            <header className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="md:w-1/2 fade-in">
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        A <span className="text-indigo-400">Unique</span> approach to learning with <span className="text-indigo-400">Athena AI</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        Unlock your potential with personalized AI tutoring, available anytime, anywhere.
                    </p>
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition">
                        Get Started
                    </Button>
                </div>
                 {/* <Slideshow/> */}
                 <section className="container mx-auto px-4 py-20 text-center fade-in delay-300">
                <h2 className="text-4xl font-semibold mb-6">
                    Advance Your Education With <span className="text-indigo-400">Athena AI</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                    Experience AI-powered learning that adapts to your style, teaches any subject, and creates flashcards from your documents.
                </p>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition">
                    Ask Athena
                </Button>
            </section>
                <div className="w-auto fade-in delay-200">
                   
                </div>
            </header>


            {/* Why Choose Athena AI Section */}
            <section className="bg-gray-800 py-20 fade-in delay-400">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center mb-12">
                        WHY CHOOSE <span className="text-indigo-400">ATHENA AI</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Audiofy", desc: "Transform your notes into engaging audio lessons." },
                            { title: "Smart Study Assistant", desc: "Step-by-step AI guidance to tackle problems." },
                            { title: "Video Analysis", desc: "Concise summaries from videos and YouTube links." },
                            { title: "Quiz and Test Prep", desc: "Generate quizzes and flashcards." },
                            { title: "Smart Notes", desc: "Organize and highlight key info in notes." },
                            { title: "Smart Search", desc: "Powerful academic reference search." }
                        ].map((item, i) => (
                            <Card key={i} className="bg-gray-900 border border-gray-700 shadow-md hover:shadow-xl transition">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-white">{item.title}</CardTitle>
                                    <CardDescription className="text-sm text-gray-400">{item.desc}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="container mx-auto px-4 py-20 text-center fade-in delay-500">
                <h2 className="text-4xl font-semibold mb-12">What Our Students Say</h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/3">
                        <img src={studentImage} alt="Student" className="rounded-lg shadow-lg" />
                    </div>
                    <div className="md:w-2/3 text-left">
                        <p className="text-xl italic text-gray-300 mb-4">
                            “There is no way I could have made the same progress learning Java without Athena AI. It has turned learning into a hobby.”
                        </p>
                        <p className="font-semibold text-white">Miss Whitney, Computer Science</p>
                    </div>
                </div>
                <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition">More Info</Button>
            </section>

            {/* FAQ Section */}
            <section className="bg-gray-800 py-20 fade-in delay-600">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-semibold text-center mb-12">Common Questions</h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {[
                            "How can I know my level of knowledge?",
                            "Can I study with Athena individually?",
                            "How do I access Audiofy?",
                            "Do I need to buy materials?",
                            "Does Athena adjust to my schedule?",
                            "How do I get started with the first lesson?"
                        ].map((question, idx) => (
                            <AccordionItem key={idx} className="border border-gray-700 rounded-lg">
                                <AccordionTrigger className="text-left px-4 py-3 hover:bg-gray-700 transition rounded-t-lg">
                                    {question}
                                </AccordionTrigger>
                                <AccordionContent className="px-4 py-4 text-gray-300 bg-gray-900 rounded-b-lg">
                                    By the end of the lesson, you will know if this kind of online lesson is right for you.
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Free Trial Section */}
            <section className="container mx-auto px-4 py-20 text-center fade-in delay-700">
                <h2 className="text-4xl font-semibold mb-8">Get a Free Trial Lesson Today</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Input type="email" placeholder="Enter your email" className="max-w-md bg-gray-800 text-white border border-gray-700 shadow-sm" />
                    <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md transition">
                        Start with Athena AI
                    </Button>
                </div>
            </section>
            <footer className="border-t border-gray-200 bg-white py-8">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
    
    {/* Left - Logo or App Name */}
    <div className="text-xl font-semibold text-indigo-600">
      Athena
    </div>

    {/* Middle - Navigation Links */}
    <div className="flex space-x-6 text-gray-600 text-sm">
      <a href="/about" className="hover:text-indigo-600 transition">About</a>
      <a href="/courses" className="hover:text-indigo-600 transition">Courses</a>
      <a href="/contact" className="hover:text-indigo-600 transition">Contact</a>
      <a href="/faq" className="hover:text-indigo-600 transition">FAQ</a>
    </div>

    {/* Right - Social Icons */}
    <div className="flex space-x-4">
      <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.04 4.29 4.29 0 00-7.4 3.9A12.16 12.16 0 013 4.8a4.29 4.29 0 001.33 5.72 4.24 4.24 0 01-1.94-.54v.06a4.29 4.29 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.55 12.14 12.14 0 008.29 21c7.55 0 11.68-6.25 11.68-11.68 0-.18 0-.36-.01-.54A8.36 8.36 0 0024 5.5a8.6 8.6 0 01-2.54.7z" />
        </svg>
      </a>
      <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.09 8.28 8.84v-6.26H8.11V12h2.21v-1.83c0-2.19 1.3-3.41 3.29-3.41.95 0 1.94.17 1.94.17v2.13h-1.1c-1.09 0-1.43.68-1.43 1.37V12h2.43l-.39 1.58h-2.04V20c4.68-.75 8.28-4.43 8.28-8.84 0-5.5-4.46-9.96-9.96-9.96z" />
        </svg>
      </a>
     
    </div>
  </div>
</footer>

        </div>
    );
};

export default LandingPage;
