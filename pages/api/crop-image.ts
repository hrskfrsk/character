import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageUrl, cropData } = req.body;

    console.log('Crop request:', { imageUrl, cropData });

    if (!imageUrl || !cropData) {
      return res.status(400).json({ error: 'imageUrl and cropData are required' });
    }

    const { x, y, width, height } = cropData;

    // 画像を取得
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    console.log('Image buffer size:', imageBuffer.byteLength);

    // 画像の情報を取得
    const imageInfo = await sharp(Buffer.from(imageBuffer)).metadata();
    console.log('Image metadata:', imageInfo);

    // クロップ範囲の検証と調整
    const safeX = Math.max(0, Math.min(Math.round(x), (imageInfo.width || 0) - 1));
    const safeY = Math.max(0, Math.min(Math.round(y), (imageInfo.height || 0) - 1));
    const safeWidth = Math.max(1, Math.min(Math.round(width), (imageInfo.width || 0) - safeX));
    const safeHeight = Math.max(1, Math.min(Math.round(height), (imageInfo.height || 0) - safeY));

    console.log('Crop parameters:', { 
      original: { x, y, width, height },
      safe: { x: safeX, y: safeY, width: safeWidth, height: safeHeight },
      imageSize: { width: imageInfo.width, height: imageInfo.height }
    });

    // Sharp を使用して画像をクロップ・リサイズ
    const croppedBuffer = await sharp(Buffer.from(imageBuffer))
      .extract({
        left: safeX,
        top: safeY,
        width: safeWidth,
        height: safeHeight
      })
      .resize(128, 128, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    console.log('Cropped buffer size:', croppedBuffer.length);

    // Base64形式で返す
    const base64Image = `data:image/jpeg;base64,${croppedBuffer.toString('base64')}`;

    res.status(200).json({ croppedImage: base64Image });
  } catch (error) {
    console.error('Image crop error:', error);
    res.status(500).json({ 
      error: 'Failed to crop image',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}