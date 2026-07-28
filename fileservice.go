package main

import (
  "fmt"
	"os"
	"encoding/base64"
	"github.com/wailsapp/wails/v3/pkg/application"
)

type FileService struct{
	app *application.App
}

func QFileService(app *application.App) *FileService {
  return &FileService{app: app}
}

// ReadFile shows an open file dialog and returns the data as Base64 string
func (s *FileService) ReadFile() [3]string {
	path, err := s.app.Dialog.OpenFile().
	  SetTitle("Select File").
		// SetDirectory(defaultPath).
		AddFilter("Fallout save (*.DAT)", "*.DAT").
		PromptForSingleSelection()

  status := [3]string{path,"",""}

  if err != nil {
    status[2] = err.Error()
    println(fmt.Sprintf("Error opening file '%s': '%s'", path, status[2]))
    return status
  }

  // No file selected
  if path == "" {
    return status
  }

  data, err := os.ReadFile(path)
  if err != nil {
    status[2] = err.Error()
    println(fmt.Sprintf("Error reading file '%s': '%s'", path, status[2]))
    return status
  }

  println(fmt.Sprintf("Read file '%s'", path))

  status[1] = base64.StdEncoding.EncodeToString(data)

  return status
}

func (s *FileService) SaveFile(
  b64 string,
  defaultPath string,
  defaultFilename string,
) [2]string {
  path, err := s.app.Dialog.SaveFile().
    // SetTitle("Save Document").
    SetFilename(defaultFilename).
		SetDirectory(defaultPath).
		AddFilter("Fallout save (*.DAT)", "*.DAT").
		PromptForSingleSelection()

  status := [2]string{path,""}

  if err != nil {
    status[1] = err.Error()
    println(fmt.Sprintf("Error opening file '%s': '%s'", path, status[1]))
    return status
   }

  // No file selected
  if path == "" {
    return status
  }

  buf, err := base64.StdEncoding.DecodeString(b64);
  err = os.WriteFile(path, buf, 0644);

  if err != nil {
    status[1] = err.Error()
    println(fmt.Sprintf("Error writing file '%s': '%s'", path, status[1]))
    return status
  }

  println(fmt.Sprintf("Wrote file '%s'", path))

  return status
}

