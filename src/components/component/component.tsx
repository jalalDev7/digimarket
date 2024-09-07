import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container px-4 md:px-6 py-4 flex items-center justify-between mx-auto">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Digi Market</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            <MenuIcon className="w-5 h-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <Carousel className="w-full max-w-full overflow-hidden z-10">
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width="1920"
                height="600"
                alt="Featured Product"
                className="w-full h-[400px] md:h-[600px] object-cover"
                style={{ aspectRatio: "1920/600", objectFit: "cover" }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width="1920"
                height="600"
                alt="Featured Product"
                className="w-full h-[400px] md:h-[600px] object-cover"
                style={{ aspectRatio: "1920/600", objectFit: "cover" }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="/placeholder.svg"
                width="1920"
                height="600"
                alt="Featured Product"
                className="w-full h-[400px] md:h-[600px] object-cover"
                style={{ aspectRatio: "1920/600", objectFit: "cover" }}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 items-center justify-center mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Featured Products</h2>
                <p className="text-muted-foreground">
                  Discover our latest and greatest products.
                </p>
              </div>
              <Link href="#" className="mt-4 md:mt-0" prefetch={false}>
                <Button variant="outline">View More</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              <Card>
                <img
                  src="/placeholder.svg"
                  width="400"
                  height="300"
                  alt="Product 1"
                  className="w-full h-[200px] object-cover rounded-t-lg"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Product 1</h3>
                  <p className="text-muted-foreground">$49.99</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width="400"
                  height="300"
                  alt="Product 2"
                  className="w-full h-[200px] object-cover rounded-t-lg"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Product 2</h3>
                  <p className="text-muted-foreground">$79.99</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width="400"
                  height="300"
                  alt="Product 3"
                  className="w-full h-[200px] object-cover rounded-t-lg"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Product 3</h3>
                  <p className="text-muted-foreground">$99.99</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <img
                  src="/placeholder.svg"
                  width="400"
                  height="300"
                  alt="Product 4"
                  className="w-full h-[200px] object-cover rounded-t-lg"
                  style={{ aspectRatio: "400/300", objectFit: "cover" }}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Product 4</h3>
                  <p className="text-muted-foreground">$59.99</p>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 bg-muted ">
          <div className="container px-4 md:px-6 items-center justify-center mx-auto">
            <div className="grid md:grid-cols-2 gap-8 ">
              <div>
                <h2 className="text-primary text-2xl font-bold mb-4">
                  Why Choose Us?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <AwardIcon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-primary text-lg font-semibold">
                        Award-Winning
                      </h3>
                      <p className="text-muted-foreground">
                        Our products have been recognized for their excellence
                        in design and innovation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <BadgeIcon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-primary text-lg font-semibold">
                        Certified Quality
                      </h3>
                      <p className="text-muted-foreground">
                        All our products are rigorously tested and certified to
                        meet the highest quality standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ThumbsUpIcon className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="text-primary text-lg font-semibold">
                        Trusted by Customers
                      </h3>
                      <p className="text-muted-foreground">
                        Our customers love our products and consistently provide
                        positive feedback and reviews.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-primary text-2xl font-bold mb-4">
                  What Our Customers Say
                </h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">John Doe</h3>
                          <p className="text-muted-foreground">
                            Satisfied Customer
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">
                        "I'm absolutely thrilled with my purchase from Digital\n
                        Store. The quality is outstanding, and the customer\n
                        service is top-notch. Highly recommended!"
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JA</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Jane Appleseed
                          </h3>
                          <p className="text-muted-foreground">
                            Satisfied Customer
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground">
                        "I'm so impressed with the selection and value at\n Digi
                        Market. The products are fantastic, and the\n shopping
                        experience was a breeze. Highly recommended!"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6 border-t">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MountainIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Digi Market</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <TwitterIcon className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <FacebookIcon className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <InstagramIcon className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; 2024 Digi Market. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function AwardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  );
}

function BadgeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ThumbsUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
