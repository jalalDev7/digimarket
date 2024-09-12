import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Package } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
const ProductShow = (props: { productId: string }) => {
  const { data: product } = trpc.getProductData.useQuery({
    id: props.productId,
  });
  return (
    <Card className="max-w-4xl mx-auto">
      {product ? (
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square">
              <Image
                src={product.imageLink}
                alt="Product Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">
                        {product.categories?.title}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">{product.price} MAD</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{product.desc}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Total orders: {product._count.orders}</span>
                </div>
                <Button className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Buy now
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
};

export default ProductShow;
