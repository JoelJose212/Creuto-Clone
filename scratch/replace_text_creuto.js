const fs = require("fs")
const path = require("path")

console.log("====================================================")
console.log("   Creuto -> Aanandi Text Sweeper Script")
console.log("====================================================\n")

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    if (isDirectory) {
      // Skip node_modules and .next directories
      if (f !== "node_modules" && f !== ".next" && f !== ".git") {
        walkDir(dirPath, callback)
      }
    } else {
      callback(dirPath)
    }
  })
}

let modifiedCount = 0

// Walk through src directory and process all files
const srcDir = path.join(__dirname, "../src")
if (fs.existsSync(srcDir)) {
  walkDir(srcDir, filePath => {
    const ext = path.extname(filePath)
    if ([".tsx", ".ts", ".json", ".css"].includes(ext)) {
      try {
        let content = fs.readFileSync(filePath, "utf8")
        let lines = content.split(/\r?\n/)
        let fileChanged = false

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          
          // CRITICAL SAFETY GUARD: Skip lines containing imports or file path references
          if (
            line.trim().startsWith("import ") ||
            line.includes("require(") ||
            line.includes("from \"") ||
            line.includes("from '") ||
            line.includes("href=\"/cloned_next") ||
            line.includes("src=\"/cloned_next") ||
            line.includes(".woff2") ||
            line.includes("/img/partners/") // partner logos paths
          ) {
            continue
          }

          // Safe replacements of text references
          let newLine = line
          
          // Replace website URL first
          if (newLine.includes("creuto.com")) {
            newLine = newLine.replace(/creuto\.com/g, "aananditechnosoft.com")
            fileChanged = true
          }
          
          // Replace exact word Creuto
          if (newLine.includes("Creuto")) {
            newLine = newLine.replace(/Creuto/g, "Aanandi")
            fileChanged = true
          }
          
          // Replace exact word CREUTO
          if (newLine.includes("CREUTO")) {
            newLine = newLine.replace(/CREUTO/g, "AANANDI")
            fileChanged = true
          }

          // Replace lowercase creuto when it stands alone as text (e.g. in greetings or emails, but not CSS selectors)
          if (newLine.includes("creuto") && !newLine.includes("cloned-page") && !newLine.includes("mui-") && !newLine.includes("class") && !newLine.includes("id=")) {
            // Safe replacement of standalone words
            newLine = newLine.replace(/\bcreuto\b/g, "aanandi")
            fileChanged = true
          }

          lines[i] = newLine
        }

        if (fileChanged) {
          fs.writeFileSync(filePath, lines.join("\n"), "utf8")
          console.log(`✅ Processed text replacements in: ${path.relative(srcDir, filePath)}`)
          modifiedCount++
        }
      } catch (err) {
        console.error(`❌ Error processing ${filePath}:`, err.message)
      }
    }
  })
}

console.log("\n====================================================")
console.log(`🎉 Sweeper Complete! Modified ${modifiedCount} files.`)
console.log("====================================================\n")
