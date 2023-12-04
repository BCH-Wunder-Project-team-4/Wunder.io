import React from 'react';
import Image from 'next/image';
import { DrupalNode } from 'next-drupal';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/drupal/absolute-url';

interface LogoWallProps {
  clients: DrupalNode[];
}

export function LogoWall({ clients }: LogoWallProps) {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {clients.map((client) => (
        <Link 
          href={client.field_link.full_url}
          key={client.id}
          target="_blank"
          rel="noopener noreferrer">
          <div className="p-5">
            <Image
            src={absoluteUrl(client.field_logo.uri.url)}
            width={150}
            height={150}
            alt={client.field_logo.resourceIdObjMeta.alt}
            className="max-w-full object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};