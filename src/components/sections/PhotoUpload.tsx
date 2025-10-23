'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'

interface UploadedFile {
  id: string
  file: File
  preview: string
  category: string
  title: string
  description: string
}

export function PhotoUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    { id: 'wedding', name: '婚纱照', icon: '💕' },
    { id: 'life', name: '生活照', icon: '📸' },
    { id: 'proposal', name: '求婚', icon: '🎉' },
    { id: 'engagement', name: '订婚', icon: '💍' },
    { id: 'travel', name: '旅行', icon: '✈️' },
    { id: 'family', name: '家庭', icon: '👨‍👩‍👧‍👦' }
  ]

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      category: 'wedding',
      title: file.name.split('.')[0],
      description: ''
    }))

    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files)
  }

  const updateFileInfo = (id: string, field: keyof UploadedFile, value: string) => {
    setUploadedFiles(prev =>
      prev.map(file =>
        file.id === id ? { ...file, [field]: value } : file
      )
    )
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const handleUpload = async () => {
    setIsUploading(true)
    
    try {
      // 模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 这里应该调用API上传照片
      console.log('Uploading files:', uploadedFiles)
      
      // 清空已上传的文件
      setUploadedFiles([])
      
      // 显示成功消息
      alert('照片上传成功！')
    } catch (error) {
      console.error('Upload failed:', error)
      alert('上传失败，请重试')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="card">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold text-gradient mb-2">上传照片</h3>
        <p className="text-gray-600">分享您的珍贵回忆，让更多人见证我们的幸福</p>
      </motion.div>

      {/* 上传区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-rose-gold bg-rose-gold/5'
            : 'border-gray-300 hover:border-rose-gold hover:bg-rose-gold/5'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="text-6xl">📸</div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {isDragging ? '松开鼠标上传照片' : '拖拽照片到这里或点击选择'}
            </h4>
            <p className="text-gray-600 mb-4">
              支持 JPG、PNG、GIF 格式，单张照片不超过 10MB
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-rose-gold text-white rounded-lg hover:bg-rose-dark transition-colors"
            >
              选择照片
            </button>
          </div>
        </div>

        {/* 上传进度指示器 */}
        {isUploading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">正在上传照片...</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* 已选择的照片 */}
      {uploadedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            已选择 {uploadedFiles.length} 张照片
          </h4>

          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-start space-x-4">
                  {/* 照片预览 */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={file.preview}
                      alt={file.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* 照片信息编辑 */}
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`title-${file.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          照片标题
                        </label>
                        <input
                          id={`title-${file.id}`}
                          type="text"
                          value={file.title}
                          onChange={(e) => updateFileInfo(file.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                          placeholder="请输入照片标题"
                        />
                      </div>

                      <div>
                        <label htmlFor={`category-${file.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          照片分类
                        </label>
                        <select
                          id={`category-${file.id}`}
                          value={file.category}
                          onChange={(e) => updateFileInfo(file.id, 'category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`description-${file.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        照片描述
                      </label>
                      <textarea
                        id={`description-${file.id}`}
                        value={file.description}
                        onChange={(e) => updateFileInfo(file.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                        rows={2}
                        placeholder="描述这张照片的故事..."
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {file.file.name} • {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 上传按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex items-center justify-between"
          >
            <div className="text-sm text-gray-600">
              共 {uploadedFiles.length} 张照片，准备上传
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setUploadedFiles([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                清空所有
              </button>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="px-6 py-2 bg-gradient-to-r from-rose-gold to-rose-dark text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? '上传中...' : '开始上传'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 上传提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-xl">💡</span>
          <div>
            <h5 className="font-semibold text-blue-900 mb-1">上传提示</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 建议上传高质量照片，尺寸不小于 800x600 像素</li>
              <li>• 照片将自动压缩优化，确保加载速度</li>
              <li>• 上传的照片将经过审核后显示在画廊中</li>
              <li>• 请确保您有照片的使用权限</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
