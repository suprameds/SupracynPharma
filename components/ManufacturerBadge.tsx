import { Factory } from "lucide-react";

export default function ManufacturerBadge() {
    return (
        <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center space-x-2 animate-bounce-slow">
            <Factory className="h-4 w-4" />
            <span className="text-sm font-semibold">Direct from Factory – No Middlemen</span>
        </div>
    );
}
