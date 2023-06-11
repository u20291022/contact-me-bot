import { existsSync, appendFileSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { ExceptionHandlerD, LogClassCreationD } from "../types/decorators"

@LogClassCreationD
@ExceptionHandlerD()
class FileSystem {
  public exists(path: string): boolean {
    return existsSync(path)
  }

  public append(path: string, data: string): void {
    appendFileSync(path, data)
  }

  public read(path: string): string {
    let result = ""

    if (this.exists(path)) {
      result = readFileSync(path, {"encoding": "utf-8"})
    }

    return result
  }

  public readJson<T extends {}>(path: string): T | undefined {
    let result = undefined
    
    if (this.exists(path)) {
      const stringData = this.read(path)
      result = JSON.parse(stringData)
    }

    return result
  }

  public write(path: string, data: string): void {
    writeFileSync(path, data)
  }

  public writeJson<T extends {}>(path: string, data: T): void {
    const stringData = JSON.stringify(data, null, "\t")
    this.write(path, stringData)
  }

  public makeDirectory(directoryPath: string): void {
    if (!this.exists(directoryPath)) {
      mkdirSync(directoryPath)
    }
  }

  public makeDirectoryPath(directoryPath: string): void {
    const directories = directoryPath.split("\/") || directoryPath.split("\\")
    const lastDirectory = directories[directories.length - 1]

    if (!lastDirectory) { // if directoryPath ended with / or \ lastDirectory will be undefined
      directories.pop()
    }
    
    directories.reduce((path: string, currentDirectory: string, index: number) => {
      if (index === 1) { // create first directory
        this.makeDirectory(path)
      }
      
      if (currentDirectory) {
        const currentPath = path + "/" + currentDirectory
        this.makeDirectory(currentPath)
      }

      return path + currentDirectory
    })
  }
}

export const fileSystem = new FileSystem()