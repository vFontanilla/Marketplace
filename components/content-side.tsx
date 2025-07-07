import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function ContentSide() {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Pick</h2>
      <div className="space-y-6">
        <form className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input className="pl-10" placeholder="Search for a product" />
          </div>
          <Button>Search</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        <a href="#">
          <Card>
            <CardContent>
              <CardTitle>Image</CardTitle>
              <CardDescription>
                <div>$5,000</div>
                <div>Test</div>
                <div>Listed a day ago</div>
                <div>Talisay City</div>
              </CardDescription>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}