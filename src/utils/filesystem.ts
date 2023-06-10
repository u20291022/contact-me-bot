import { existsSync, appendFileSync, mkdirSync, readFileSync } from "fs"
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