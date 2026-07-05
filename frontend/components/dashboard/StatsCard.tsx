import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatsCardProps {
  title: string
  description: string
  actionText: string
  onActionClick: () => void
}


const StatsCard = ({ title, description, actionText, onActionClick }: StatsCardProps) => {
  return (
   <Card size="sm" className="mx-auto text-white w-full max-w-sm bg-black backdrop-blur-md shadow-lg shadow-black/30 ring-1 ring-black/10 hover:shadow-black/40 hover:ring-black/20 transition-all duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {description}
        </p>
      </CardContent>
      {/* <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={onActionClick}>
          {actionText}
        </Button>
      </CardFooter> */}
    </Card>
  )
}

export default StatsCard
