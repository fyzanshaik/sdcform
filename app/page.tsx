import { ApplicationDialog } from '@/components/form/DialogForm';
import { TextScramble } from '@/components/motion-shadcn/scramble-text';
import { ModeToggle } from '@/components/theme/theme-toggle-button';
import {
	ExternalLink,
	Phone,
	Calendar,
	MapPin,
	Gift,
	BookOpen,
	Users,
	Mic,
	Smile,
	Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';
import { GeistMono } from 'geist/font/mono';

export default function Home() {
	return (
		<div
			className={`min-h-screen bg-background relative ${GeistMono.className}`}
		>
			<div className="fixed top-4 left-4 z-50">
				<ModeToggle />
			</div>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<header className="mb-12 sm:mb-16 text-center">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
						Student Developers Club
					</h1>
					<div className="text-lg sm:text-xl text-muted-foreground font-light tracking-wide">
						<TextScramble>SDC</TextScramble>
					</div>
				</header>

				<article className="prose prose-base sm:prose-lg dark:prose-invert max-w-none space-y-8 sm:space-y-10">
					<div className="space-y-4 sm:space-y-5">
						<p className="text-base sm:text-lg leading-relaxed text-foreground/90">
							The Student Developers Club was founded to bring together
							curious minds who love exploring and tinkering with
							technology. We are a passionate team of software developers,
							and we&apos;re always looking for new members who share our
							enthusiasm for building and learning.
						</p>

						<p className="text-base sm:text-lg leading-relaxed text-foreground/90">
							If you&apos;re a geek who has built projects or has ideas
							you&apos;re excited about, we&apos;d love to have you join
							us!
						</p>

						{/* <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-4 sm:p-5 rounded-lg">
							<p className="text-base sm:text-lg leading-relaxed m-0">
								We currently have{' '}
								<strong className="text-primary">
									two open leadership positions
								</strong>{' '}
								in our club.
								<br />
								You&apos;re also welcome to join as a member and be part of
								our growing community.
							</p>
						</div> */}
					</div>

					{/* Interview Details */}
					{/* <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 p-4 sm:p-6 rounded-xl">
						<div className="flex items-center gap-2 mb-4">
							<Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							<h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300 m-0">
								Interview Details
							</h2>
						</div>
						<div className="space-y-2 text-sm sm:text-base">
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								<span>
									<strong>Date & Time:</strong> July 12th and 14th, 2:20 PM
								</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
								<span>
									<strong>Location:</strong> Students Affair Cell (above
									canteen)
								</span>
							</div>
						</div>
					</section> */}

					{/* Perks Section */}
					<section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 p-4 sm:p-6 rounded-xl">
						<div className="flex items-center gap-2 mb-4">
							<Gift className="w-5 h-5 text-green-600 dark:text-green-400" />
							<h2 className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-300 m-0">
								Perks of Being in the Team
							</h2>
						</div>
						<div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
							<div className="flex items-start gap-2">
								<BookOpen className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
								<span className="text-sm sm:text-base">
									Get access to any course/resource easily (we have a lot
									of resources)
								</span>
							</div>
							<div className="flex items-start gap-2">
								<Gift className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
								<span className="text-sm sm:text-base">
									Stickers! (we have a lot of stickers)
								</span>
							</div>
							<div className="flex items-start gap-2">
								<Users className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
								<span className="text-sm sm:text-base">
									Connections with other geeks(freelance + interns)
								</span>
							</div>
							<div className="flex items-start gap-2">
								<Mic className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
								<span className="text-sm sm:text-base">
									Platform to speak
								</span>
							</div>
							<div className="flex items-start gap-2 sm:col-span-2">
								<Smile className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
								<span className="text-sm sm:text-base">
									We could be fun (we think)
								</span>
							</div>
						</div>
					</section>

					{/* Application Form Section */}
					<section>
						{/* <div className="mb-4 flex flex-col items-center">
							<div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 px-4 py-2 text-yellow-900 dark:text-yellow-100 text-center text-base font-medium max-w-xl shadow-sm">
								<span className="font-semibold">Note:</span> You do{' '}
								<span className="font-bold text-green-700 dark:text-green-300">
									not
								</span>{' '}
								need to attend an interview to join as a{' '}
								<span className="font-bold text-primary">Club Member</span>
								. Interviews are only required for leadership positions.
							</div>
						</div> */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border-2 border-primary/40 shadow-lg animate-pulse-slow relative">
							{/* <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
								<span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md animate-pulse-slow">
									<Star className="w-4 h-4 mr-1 text-yellow-300" /> Most
									Important
								</span>
							</div> */}
							<p className="text-sm sm:text-base text-muted-foreground mt-4 sm:mt-0">
								Apply through this form
							</p>
							<span className="text-sm sm:text-base text-muted-foreground hidden sm:inline">
								→
							</span>
							<ApplicationDialog />
						</div>
					</section>

					{/* What We're Looking For Section */}
					<section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8">
						<div className="flex items-center gap-2 mb-4">
							<Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							<h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300 m-0">
								What we&apos;re looking for
							</h2>
						</div>
						<div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
							<div className="flex items-start gap-2">
								<span className="text-blue-600 dark:text-blue-400 mt-1 text-xs sm:text-sm font-bold">•</span>
								<span className="text-sm sm:text-base">
									A genuine love for programming
								</span>
							</div>
							<div className="flex items-start gap-2">
								<span className="text-blue-600 dark:text-blue-400 mt-1 text-xs sm:text-sm font-bold">•</span>
								<span className="text-sm sm:text-base">
									Experience shipping projects or having creative ideas
								</span>
							</div>
							<div className="flex items-start gap-2 sm:col-span-2">
								<span className="text-blue-600 dark:text-blue-400 mt-1 text-xs sm:text-sm font-bold">•</span>
								<span className="text-sm sm:text-base">
									Interest in a specific domain you&apos;d like to build in and discuss
								</span>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary">
							Recommended Resources
						</h2>

						<p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
							Here are some videos and blogs we suggest you check out
							before applying:
						</p>

						<div className="grid gap-2 sm:gap-3 bg-muted/20 p-4 rounded-lg border">
							{[
								'https://www.youtube.com/watch?v=4lb3dAtKcJo',
								'https://www.youtube.com/watch?v=0IsQqJ7pwhw',
								'https://www.youtube.com/watch?v=QXjU9qTsYCc',
								'https://www.youtube.com/watch?v=I1f45REi3k4',
								'https://www.youtube.com/watch?v=XBu54nfzxAQ',
								'https://www.youtube.com/watch?v=WG5ikvJ2TKA',
								'https://www.youtube.com/watch?v=U3aXWizDbQ4',
							].map((url, index) => (
								<div
									key={index}
									className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors"
								>
									<span className="text-primary font-mono text-xs">•</span>
									<a
										href={url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-500 hover:text-blue-400 transition-colors duration-200 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium break-all"
									>
										{url}
										<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
									</a>
								</div>
							))}
						</div>
					</section>

					{/* <section className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800 p-4 sm:p-6 rounded-xl">
						<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-orange-700 dark:text-orange-300">
							Help Us Fix a Bug! (Bonus points)
						</h2>

						<div className="space-y-4 sm:space-y-5 text-sm sm:text-base">
							<p>
								There&apos;s a bug on our page. Find it and fix it!
								<br />
								If you&apos;d like to help, check out our codebase here:
							</p>

							<div className="pl-3 sm:pl-4 border-l-2 border-orange-300 dark:border-orange-700">
								<a
									href="https://github.com/fyzanshaik/sdcform"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm break-all"
								>
									https://github.com/fyzanshaik/sdcform
									<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
								</a>
							</div>

							<p>For more context, visit:</p>

							<div className="pl-3 sm:pl-4 border-l-2 border-orange-300 dark:border-orange-700">
								<a
									href="https://gitingest.com/fyzanshaik/sdcform"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 sm:gap-2 font-mono text-xs sm:text-sm break-all"
								>
									https://gitingest.com/fyzanshaik/sdcform
									<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
								</a>
							</div>

							<p>
								If you find and fix the issue, please send us a Pull
								Request!
								<br />
								Not sure how? Here&apos;s a helpful guide:
							</p>

							<div className="pl-3 sm:pl-4 border-l-2 border-orange-300 dark:border-orange-700">
								<a
									href="https://www.youtube.com/watch?v=nCKdihvneS0"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 hover:text-blue-400 transition-colors duration-200 inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm break-all"
								>
									https://www.youtube.com/watch?v=nCKdihvneS0
									<ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
								</a>
							</div>
						</div>
					</section> */}

					<div className="text-center py-3 sm:py-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
						<div className="space-y-3 sm:space-y-4">
							<p className="text-lg sm:text-xl font-semibold text-primary">
								We&apos;re excited to see what you&apos;ll bring to the
								Student Developers Club!
							</p>
							<p className="text-base sm:text-lg text-muted-foreground">
								Join us, learn, build, and make an impact.
							</p>
						</div>
					</div>
				</article>
			</div>

			<footer className="border-t bg-gradient-to-r from-muted/30 to-muted/20 mt-12 sm:mt-1">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
					<div className="text-center space-y-4">
						<h3 className="text-lg sm:text-xl font-semibold text-primary">
							Contact Us
						</h3>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
							{/* Aniketh Contact */}
							<div className="flex flex-col gap-2 sm:flex-row sm:items-center bg-background/50 px-3 py-2 rounded-lg border">
								<span className="font-medium text-primary">Aniketh:</span>
								<div className="flex gap-2">
									<Button
										asChild
										className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-lg shadow transition-colors"
									>
										<a
											href="https://wa.me/918712289614"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Chat with Aniketh on WhatsApp"
										>
											<FaWhatsapp className="w-5 h-5" />
											<span>WhatsApp</span>
										</a>
									</Button>
									<Button
										asChild
										variant="outline"
										className="flex items-center gap-2 text-primary font-semibold px-3 py-2 rounded-lg border border-primary/40 shadow transition-colors"
									>
										<a href="tel:+918712289614" aria-label="Call Aniketh">
											<Phone className="w-5 h-5" />
											<span>+91 87122 89614</span>
										</a>
									</Button>
								</div>
							</div>
							{/* Gnaneshwar Contact */}
							<div className="flex flex-col gap-2 sm:flex-row sm:items-center bg-background/50 px-3 py-2 rounded-lg border">
								<span className="font-medium text-primary">
									Gnaneshwar:
								</span>
								<div className="flex gap-2">
									<Button
										asChild
										className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-2 rounded-lg shadow transition-colors"
									>
										<a
											href="https://wa.me/9347560270"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Chat with Gnaneshwar on WhatsApp"
										>
											<FaWhatsapp className="w-5 h-5" />
											<span>WhatsApp</span>
										</a>
									</Button>
									<Button
										asChild
										variant="outline"
										className="flex items-center gap-2 text-primary font-semibold px-3 py-2 rounded-lg border border-primary/40 shadow transition-colors"
									>
										<a
											href="tel:+919347560270"
											aria-label="Call Gnaneshwar"
										>
											<Phone className="w-5 h-5" />
											<span>+91 93475 60270</span>
										</a>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/4 rounded-full blur-3xl animate-pulse"></div>
				<div
					className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-primary/4 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: '2s' }}
				></div>
				<div
					className="absolute top-3/4 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary/3 rounded-full blur-2xl animate-pulse"
					style={{ animationDelay: '4s' }}
				></div>
			</div>
		</div>
	);
}
