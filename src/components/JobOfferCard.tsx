"use client";

import { JobOffer } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface JobOfferCardProps {
  offer: JobOffer;
  isLoading?: boolean;
}

export function JobOfferCard({ offer, isLoading = false }: JobOfferCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto animate-pulse">
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const getCompanySizeColor = (size: string) => {
    const colors = {
      Startup: 'bg-purple-100 text-purple-800',
      'Scale-up': 'bg-blue-100 text-blue-800',
      Medium: 'bg-green-100 text-green-800',
      Enterprise: 'bg-gray-100 text-gray-800',
    };
    return colors[size as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getWorkModeColor = (mode: string) => {
    const colors = {
      Remote: 'bg-emerald-100 text-emerald-800',
      Hybrid: 'bg-yellow-100 text-yellow-800',
      'On-site': 'bg-red-100 text-red-800',
    };
    return colors[mode as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getExperienceColor = (level: string) => {
    const colors = {
      Junior: 'bg-indigo-100 text-indigo-800',
      Mid: 'bg-cyan-100 text-cyan-800',
      Senior: 'bg-orange-100 text-orange-800',
      Lead: 'bg-pink-100 text-pink-800',
      Manager: 'bg-violet-100 text-violet-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              {offer.company.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                {offer.title}
              </CardTitle>
              <p className="text-lg font-semibold text-gray-700">{offer.company}</p>
              <p className="text-sm text-gray-500">{offer.location}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {formatSalary(offer.salary.min, offer.salary.max, offer.salary.currency)}
            </div>
            <div className="text-sm text-gray-500">per month</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge className={getCompanySizeColor(offer.companySize)}>
            {offer.companySize}
          </Badge>
          <Badge className={getWorkModeColor(offer.workMode)}>
            {offer.workMode}
          </Badge>
          <Badge className={getExperienceColor(offer.experienceLevel)}>
            {offer.experienceLevel}
          </Badge>
          <Badge variant="outline">
            ⭐ {offer.companyRating}/5.0
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
          <p className="text-gray-700">{offer.description}</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Tecnologías</h3>
          <div className="flex flex-wrap gap-2">
            {offer.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Beneficios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {offer.benefits.slice(0, 6).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <span className="font-semibold text-gray-900">Vacaciones:</span>
            <span className="ml-2 text-gray-700">{offer.vacationDays} días</span>
          </div>
          {offer.equity && (
            <div>
              <span className="font-semibold text-gray-900">Equity:</span>
              <span className="ml-2 text-gray-700">{offer.equity}</span>
            </div>
          )}
          {offer.bonus && (
            <div>
              <span className="font-semibold text-gray-900">Bono:</span>
              <span className="ml-2 text-gray-700">{offer.bonus}</span>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Requisitos</h3>
          <ul className="space-y-1">
            {offer.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}