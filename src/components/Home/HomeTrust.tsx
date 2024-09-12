import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HomeTrust = () => {
  return (
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
                    Our products have been recognized for their excellence in
                    design and innovation.
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
                    All our products are rigorously tested and certified to meet
                    the highest quality standards.
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
                    Im absolutely thrilled with my purchase from Digital\n
                    Store. The quality is outstanding, and the customer\n
                    service is top-notch. Highly recommended!
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
                      <h3 className="text-lg font-semibold">Jane Appleseed</h3>
                      <p className="text-muted-foreground">
                        Satisfied Customer
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Im so impressed with the selection and value at\n Digi
                    Market. The products are fantastic, and the\n shopping
                    experience was a breeze. Highly recommended!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrust;

function AwardIcon(props: { className: string }) {
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

function BadgeIcon(props: { className: string }) {
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

function ThumbsUpIcon(props: { className: string }) {
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
