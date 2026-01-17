#!/bin/bash

# CHECKLIST - VÉRIFICATION DES ANIMATIONS GSAP

echo "🔍 VÉRIFICATION DES ANIMATIONS GSAP"
echo "===================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteur
PASSED=0
FAILED=0

# Function pour vérifier les fichiers
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAILED++))
    fi
}

# Function pour vérifier les répertoires
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1/"
        ((FAILED++))
    fi
}

echo "📦 VÉRIFICATION DES FICHIERS CRÉÉS"
echo "-----------------------------------"

# Composants
echo ""
echo "Composants:"
check_file "app/components/AnimatedSection.tsx"
check_file "app/components/ScrollEffects.tsx"
check_file "app/components/ScrollAdvanced.tsx"
check_file "app/components/AnimationsDemo.tsx"

# Hooks
echo ""
echo "Hooks:"
check_file "app/hooks/useScrollAnimation.tsx"
check_file "app/hooks/useScrollAnimations.ts"

# Utilitaires
echo ""
echo "Utilitaires:"
check_file "app/utils/scrollAnimations.ts"
check_file "app/utils/animationPatterns.ts"

# Configuration
echo ""
echo "Configuration:"
check_file "app/config/gsapConfig.ts"

# Styles
echo ""
echo "Styles:"
check_file "app/styles/animations.css"

# Exemples et Documentation
echo ""
echo "Exemples et Documentation:"
check_file "app/examples/AnimationIntegrationExamples.tsx"
check_file "ANIMATIONS_GUIDE.md"
check_file "ANIMATIONS_SUMMARY.md"
check_file "QUICK_START.md"

# Fichiers modifiés
echo ""
echo "Fichiers modifiés:"
check_file "app/root.tsx"

echo ""
echo "📊 VÉRIFICATION DES RÉPERTOIRES"
echo "-------------------------------"
check_dir "app/components"
check_dir "app/hooks"
check_dir "app/utils"
check_dir "app/config"
check_dir "app/styles"
check_dir "app/examples"

echo ""
echo "✅ DÉPENDANCES"
echo "---------------"

if grep -q '"gsap"' package.json; then
    echo -e "${GREEN}✓${NC} GSAP est installé dans package.json"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} GSAP n'est pas installé dans package.json"
    ((FAILED++))
fi

if grep -q '"@gsap/react"' package.json; then
    echo -e "${GREEN}✓${NC} @gsap/react est installé dans package.json"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} @gsap/react n'est pas installé (optionnel)"
fi

echo ""
echo "🎯 RÉSUMÉ"
echo "---------"
echo -e "Fichiers créés/vérifiés: ${GREEN}$PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "Fichiers manquants: ${RED}$FAILED${NC}"
else
    echo -e "Fichiers manquants: ${GREEN}0${NC}"
fi

echo ""
echo "📝 PROCHAINES ÉTAPES"
echo "-------------------"
echo "1. Vérifier que tout compile: npm run build"
echo "2. Intégrer les composants dans vos pages"
echo "3. Consulter le guide: ANIMATIONS_GUIDE.md"
echo "4. Voir les exemples: app/examples/AnimationIntegrationExamples.tsx"
echo "5. Tester les animations en développement: npm run dev"

echo ""
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TOUS LES FICHIERS SONT PRÉSENTS!${NC}"
    echo "Les animations GSAP sont prêtes à être utilisées! 🚀"
else
    echo -e "${RED}⚠️ CERTAINS FICHIERS SONT MANQUANTS!${NC}"
    echo "Veuillez vérifier les fichiers manquants ci-dessus."
fi

echo ""
