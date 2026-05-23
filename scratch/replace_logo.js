const fs = require("fs")
const path = require("path")

console.log("====================================================")
console.log("   Creuto Logo Replacement Script - Aanandi ")
console.log("====================================================\n")

const targetFiles = [
  path.join(__dirname, "../src/app/page.tsx"),
]

// Add all dynamic slugs data files
const dataDir = path.join(__dirname, "../src/app/[slug]/data")
if (fs.existsSync(dataDir)) {
  const files = fs.readdirSync(dataDir)
  files.forEach(file => {
    if (file.endsWith(".tsx")) {
      targetFiles.push(path.join(dataDir, file))
    }
  })
}

const logoSvgRegex = /<svg width="109" height="30"[\s\S]*?<\/svg>/g
const newLogoImg = `<img src="/img/aanandi_logo.png" alt="Aanandi TechnoSoft Logo" style={{ height: "36px", width: "auto", objectFit: "contain" }} />`

targetFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, "utf8")
      
      if (logoSvgRegex.test(content)) {
        content = content.replace(logoSvgRegex, newLogoImg)
        
        // Also update href="/index" inside the logo link to href="/" if it exists
        // E.g. href="/index" -> href="/"
        content = content.replace(/href="\/index"/g, 'href="/"')
        
        fs.writeFileSync(filePath, content, "utf8")
        console.log(`✅ Replaced logo successfully in: ${path.basename(filePath)}`)
      } else {
        console.log(`ℹ️ Logo SVG not found in: ${path.basename(filePath)}`)
      }
    } catch (err) {
      console.error(`❌ Failed to process ${path.basename(filePath)}:`, err.message)
    }
  } else {
    console.log(`⚠️ File does not exist: ${filePath}`)
  }
})

console.log("\n====================================================")
console.log("   Replacement Complete!")
console.log("====================================================\n")
