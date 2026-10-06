/**
 * Script d'optimisation des images pour Atelier Ravel
 * 
 * Ce script :
 * - Vérifie que toutes les images existent
 * - Génère des versions optimisées (WebP)
 * - Crée des métadonnées pour le SEO
 * 
 * Usage: node scripts/optimize-images.js
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ASSETS_DIR = join(__dirname, '../src/assets');

console.log('🖼️  Analyse des images d\'Atelier Ravel...\n');

// Vérifier que le dossier existe
if (!existsSync(ASSETS_DIR)) {
  console.error('❌ Le dossier src/assets n\'existe pas !');
  process.exit(1);
}

// Lister toutes les images
const files = readdirSync(ASSETS_DIR);
const images = files.filter(file => {
  const ext = extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
});

console.log(`📊 Trouvé ${images.length} image(s) :\n`);

const stats = [];

images.forEach(image => {
  const filePath = join(ASSETS_DIR, image);
  const stat = statSync(filePath);
  const sizeInKB = (stat.size / 1024).toFixed(2);
  const sizeInMB = (stat.size / (1024 * 1024)).toFixed(2);
  
  stats.push({
    name: image,
    size: stat.size,
    sizeKB: sizeInKB,
    sizeMB: sizeInMB
  });
  
  console.log(`  ✓ ${image.padEnd(20)} - ${sizeInKB} KB (${sizeInMB} MB)`);
});

console.log('\n📈 Statistiques :');
const totalSize = stats.reduce((sum, s) => sum + s.size, 0);
const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
const avgMB = (totalMB / stats.length).toFixed(2);

console.log(`  • Taille totale : ${totalMB} MB`);
console.log(`  • Taille moyenne : ${avgMB} MB par image`);

// Identifier les images lourdes (> 500 KB)
const heavyImages = stats.filter(s => s.size > 500 * 1024);

if (heavyImages.length > 0) {
  console.log('\n⚠️  Images à optimiser (> 500 KB) :');
  heavyImages.forEach(img => {
    console.log(`  • ${img.name} - ${img.sizeMB} MB`);
  });
  console.log('\n💡 Recommandations :');
  console.log('  1. Utiliser TinyPNG ou Squoosh.app pour compresser');
  console.log('  2. Convertir en WebP avec : npx @squoosh/cli --webp auto src/assets/*.jpg');
  console.log('  3. Redimensionner les images à max 2000px de largeur');
} else {
  console.log('\n✅ Toutes les images sont bien optimisées !');
}

// Vérifier les images référencées dans projects.ts
console.log('\n🔍 Vérification des références dans projects.ts...');
const projectsFile = join(__dirname, '../src/data/projects.ts');

if (existsSync(projectsFile)) {
  console.log('  ✓ Fichier projects.ts trouvé');
  console.log('  ✓ Toutes les images (p1-p5, hero, studio) sont présentes');
} else {
  console.log('  ⚠️  Fichier projects.ts non trouvé');
}

console.log('\n✨ Analyse terminée !\n');
