import { useState, useEffect } from "react";
import { 
  MapPin, Compass, Search, Phone, MessageSquare, ArrowUpRight, 
  Store, Star, Filter, Sparkles, Check, Loader2, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { 
  FertilizerShop, 
  DEFAULT_SHOPS, 
  generateShopsForLocation, 
  calculateDistance 
} from "@/data/fertilizerShops";
import { toast } from "sonner";

export const FertilizerShopsSection = () => {
  const { t } = useTranslation();
  
  // Geolocation states
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "requesting" | "granted" | "denied" | "unsupported">("idle");
  
  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "organic" | "cooperative">("all");
  const [selectedHub, setSelectedHub] = useState<string>("all");
  
  // Shops list
  const [shops, setShops] = useState<FertilizerShop[]>(DEFAULT_SHOPS);
  const [filteredShops, setFilteredShops] = useState<FertilizerShop[]>(DEFAULT_SHOPS);

  // Trigger geolocation access
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("requesting");
    toast.info("Requesting location access...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocationStatus("granted");
        toast.success("Location access granted! Finding nearest shops...");
        
        // Generate dynamic shops around the user
        const nearby = generateShopsForLocation(latitude, longitude);
        setShops(nearby);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setLocationStatus("denied");
        toast.error("Location permission denied. Showing default agricultural hubs instead.");
        
        // Default back to static list
        setShops(DEFAULT_SHOPS);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  // Re-calculate or filter shops whenever location, search, filter type, or selected hub changes
  useEffect(() => {
    let result = [...shops];

    // If geolocation is granted, calculate distances
    if (coords) {
      result = result.map(s => {
        const distance = calculateDistance(coords.lat, coords.lng, s.lat, s.lng);
        return { ...s, distance };
      }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (selectedHub !== "all") {
      // If manual hub selected, filter static shops close to that hub's center
      // Let's find center of the selected hub (e.g. YESHWANTHPUR or LUCKNOW)
      let hubLat = 12.9716;
      let hubLng = 77.5946; // Bengaluru default
      
      if (selectedHub === "hubballi") {
        hubLat = 15.3647;
        hubLng = 75.1240;
      } else if (selectedHub === "lucknow") {
        hubLat = 26.8467;
        hubLng = 80.9462;
      } else if (selectedHub === "hyderabad") {
        hubLat = 17.3850;
        hubLng = 78.4867;
      } else if (selectedHub === "coimbatore") {
        hubLat = 11.0168;
        hubLng = 76.9558;
      }

      result = DEFAULT_SHOPS.map(s => {
        const distance = calculateDistance(hubLat, hubLng, s.lat, s.lng);
        return { ...s, distance };
      }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else {
      // Default: clean distance property
      result = DEFAULT_SHOPS.map(s => ({ ...s, distance: undefined }));
    }

    // Apply Search Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        s => 
          s.name.toLowerCase().includes(q) || 
          s.address.toLowerCase().includes(q) ||
          s.products.some(p => p.toLowerCase().includes(q))
      );
    }

    // Apply Type Filter
    if (filterType === "organic") {
      result = result.filter(s => s.isOrganic);
    } else if (filterType === "cooperative") {
      result = result.filter(s => s.isCooperative);
    }

    setFilteredShops(result);
  }, [shops, coords, searchQuery, filterType, selectedHub]);

  return (
    <div className="space-y-10 w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border/30">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Store className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t("shops.badge", "Dealer Locator")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            {t("shops.title", "Find Nearest Fertilizer Shops")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("shops.desc", "Enable GPS to see fertilizer and pesticide distributors closest to your farm, or browse agricultural hubs manually.")}
          </p>
        </div>

        {/* Location Controller Widget */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          {locationStatus === "granted" && coords && (
            <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-success/15 border border-success/20 text-success text-xs font-bold">
              <Check className="w-4 h-4 animate-bounce" />
              <div>
                <p className="leading-none text-[10px] text-success/70 uppercase">GPS Active</p>
                <p className="mt-1 font-semibold">{coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E</p>
              </div>
            </div>
          )}

          {locationStatus === "denied" && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-warning/15 border border-warning/20 text-warning text-xs font-bold">
              <Info className="w-4 h-4 shrink-0" />
              <span>{t("shops.gps_denied", "GPS Access Blocked")}</span>
            </div>
          )}

          <Button
            onClick={requestLocation}
            disabled={locationStatus === "requesting"}
            className="rounded-2xl font-bold min-h-[48px] px-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            {locationStatus === "requesting" ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                {t("shops.detecting", "Locating...")}
              </>
            ) : (
              <>
                <Compass className="w-4.5 h-4.5 text-primary-foreground" />
                {locationStatus === "granted" ? t("shops.re_detect", "Update Location") : t("shops.use_gps", "Use Current Location")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-5 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("shops.search_placeholder", "Search by shop name, products, or chemicals...")}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-card/45 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm font-medium leading-none placeholder:text-muted-foreground/60 min-h-[48px]"
          />
        </div>

        {/* Manual Hub Dropdown (If GPS is not active) */}
        <div className="lg:col-span-3">
          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            disabled={locationStatus === "granted"}
            className="w-full px-4 py-3.5 rounded-2xl border border-border bg-card/45 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm font-semibold leading-none min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="all">
              {locationStatus === "granted" ? t("shops.hub_gps", "Sorted by Distance (GPS)") : t("shops.select_hub", "All Agricultural Hubs")}
            </option>
            <option value="bengaluru">Bengaluru Hub (KA)</option>
            <option value="hubballi">Hubballi Hub (KA)</option>
            <option value="lucknow">Lucknow Hub (UP)</option>
            <option value="hyderabad">Hyderabad Hub (TS)</option>
            <option value="coimbatore">Coimbatore Hub (TN)</option>
          </select>
        </div>

        {/* Filter Quick Buttons */}
        <div className="lg:col-span-4 flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {[
            { id: "all", label: t("shops.filter_all", "All Dealers"), icon: Store },
            { id: "organic", label: t("shops.filter_organic", "Organic Only"), icon: Sparkles },
            { id: "cooperative", label: t("shops.filter_coop", "Cooperative"), icon: Filter }
          ].map((btn) => {
            const active = filterType === btn.id;
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id as any)}
                className={`px-4.5 py-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[48px] ${
                  active 
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10" 
                    : "glass-btn hover:border-primary/20"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-primary-foreground" : "text-primary"}`} />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Shops Grid */}
      {filteredShops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop, idx) => (
            <div 
              key={shop.id}
              className="group rounded-3xl glass-card border border-border/30 hover:border-primary/30 p-6 flex flex-col justify-between space-y-6 hover:scale-[1.01] hover:shadow-xl transition-all duration-300"
            >
              {/* Card Top Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {shop.isOrganic && (
                        <Badge className="bg-success/15 hover:bg-success/20 text-success border-0 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold">
                          Organic
                        </Badge>
                      )}
                      {shop.isCooperative && (
                        <Badge className="bg-secondary/15 hover:bg-secondary/20 text-secondary border-0 px-2 py-0.5 rounded text-[10px] uppercase font-extrabold">
                          Coop Govt
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1 bg-muted/40 border border-border/30 px-2.5 py-1 rounded-xl shrink-0">
                    <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                    <span className="text-xs font-bold text-foreground leading-none">{shop.rating}</span>
                  </div>
                </div>

                {/* Distance Badge */}
                {shop.distance !== undefined && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/25 text-primary text-xs font-extrabold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{shop.distance} km away</span>
                  </div>
                )}

                {/* Timings and Address */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="leading-relaxed font-semibold">
                    📍 {shop.address}
                  </p>
                  <p className="font-medium">
                    🕒 {shop.timings}
                  </p>
                </div>

                {/* Stocked Items Badges */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 block">In Stock Products</span>
                  <div className="flex flex-wrap gap-1.5">
                    {shop.products.map((p, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-bold px-2 py-1 rounded-lg bg-muted/30 border border-border/40 text-foreground/85 hover:border-primary/20 transition-all"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-border/20">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${shop.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border hover:border-primary/20 text-xs font-bold text-foreground hover:bg-muted/40 transition-all text-center"
                  >
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    Call Dealer
                  </a>
                  <a
                    href={`https://wa.me/${shop.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border hover:border-primary/20 text-xs font-bold text-foreground hover:bg-muted/40 transition-all text-center"
                  >
                    <MessageSquare className="w-4 h-4 text-success shrink-0" />
                    WhatsApp
                  </a>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-muted/30 hover:bg-primary hover:text-primary-foreground border border-border hover:border-primary transition-all text-xs font-bold text-foreground text-center"
                >
                  Get Directions
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full text-center py-12 rounded-3xl border border-dashed border-border bg-card/15 space-y-3">
          <Store className="w-12 h-12 mx-auto text-muted-foreground/60" />
          <h4 className="text-lg font-bold text-foreground">No shops found matching your search</h4>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Try clearing search inputs or checking other agricultural hubs.</p>
          <Button 
            variant="outline" 
            onClick={() => { setSearchQuery(""); setFilterType("all"); setSelectedHub("all"); }}
            className="rounded-xl border border-primary text-primary hover:bg-primary/5 text-xs font-bold"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};
