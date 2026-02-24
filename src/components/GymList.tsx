
import React from "react";
import { Link } from "react-router-dom";
import { Gym } from "@/types/gym";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GymListProps {
  gyms: Gym[];
}

const GymList = ({ gyms }: GymListProps) => {
  return (
    <div className="container mx-auto px-4">
      {gyms.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium mb-2">No gyms found</h3>
          <p className="text-gray-500">
            Try searching with different terms or expanding your search area.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <Card key={gym.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={gym.imageUrl}
                  alt={gym.name}
                  className="w-full h-full object-cover"
                />
                {gym.featured && (
                  <Badge className="absolute top-2 right-2 bg-gym-purple">Featured</Badge>
                )}
              </div>
              
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-1">{gym.name}</h3>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{gym.location.address}, {gym.location.city}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gym-purple mr-2" />
                    <span className="text-sm">
                      {gym.openingHours.from} - {gym.openingHours.to}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gym-purple mr-2" />
                    <span className="text-sm">
                      {gym.availableSlots} slots available today
                    </span>
                  </div>
                </div>
                
                {gym.amenities && gym.amenities.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1">
                    {gym.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {gym.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{gym.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between items-center pt-0">
                <div>
                  <span className="font-bold">From ₹{gym.pricePerSlot}</span>
                  <span className="text-sm text-gray-500"> / slot</span>
                </div>
                <Link to={`/book?gymId=${gym.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GymList;
