package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// ReadFile shows an open file dialog and returns the data as Base64 string
func (a *App) ReadFile() [3]string {
  selection, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
    Title: "Select File",
    Filters: []runtime.FileFilter{
      { DisplayName: "Fallout save (*.DAT)", Pattern: "*.DAT", },
    },
  })
  status := [3]string{selection,"",""}

  if selection == "" && err == nil { 
    return status
  }

  if err != nil { 
    status[2] = err.Error()
    println(fmt.Sprintf("Error opening file '%s': '%s'", selection, status[2]))
    return status 
  }

  data, err := os.ReadFile(selection)
  if err != nil { 
    status[2] = err.Error()
    println(fmt.Sprintf("Error reading file '%s': '%s'", selection, status[2]))
    return status 
  }

  println(fmt.Sprintf("Read file '%s'", selection))

  status[1] = base64.StdEncoding.EncodeToString(data)
  
  return status
}

func (a *App) SaveFile(
  b64 string, 
  defaultPath string, 
  defaultFilename string,
) [2]string {
  selection, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
    Title: "Select File",
    DefaultDirectory: defaultPath,
    DefaultFilename: "SAVE.DAT",
    Filters: []runtime.FileFilter{
      { DisplayName: "Fallout save (*.DAT)", Pattern: "*.DAT", },
    },
  })

  status := [2]string{selection,""}

  if selection == "" && err == nil { 
    return status
  }

  if err != nil { 
    status[1] = err.Error()
    println(fmt.Sprintf("Error opening file '%s': '%s'", selection, status[1]))
    return status
   }

  buf, err := base64.StdEncoding.DecodeString(b64);
  err = os.WriteFile(selection, buf, 0644);

  if err != nil { 
    status[1] = err.Error()
    println(fmt.Sprintf("Error writing file '%s': '%s'", selection, status[1]))
    return status
   }

   println(fmt.Sprintf("Wrote file '%s'", selection))

  return status
}