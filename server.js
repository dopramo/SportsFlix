import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { parseM3U, parseM3UAll } from "./backend/m3uParser.js";
import { getLogo, matchChannel, getChannelOrder, ALLOWED_M3U_CHANNELS } from "./backend/channelMap.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' blob:; worker-src * blob: data:; connect-src *; img-src * data: blob:; frame-src *; style-src * 'unsafe-inline';"
  );
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./sportsflix-ui-template/frontend/index.html"));
});
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, "./sportsflix-ui-template/frontend/index.html"));
});
app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, "./sportsflix-ui-template/frontend/index.html"));
});
app.get('/channel.html', (req, res) => {
  res.sendFile(path.join(__dirname, "./sportsflix-ui-template/frontend/channel.html"));
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.static(path.join(__dirname, "./sportsflix-ui-template/frontend")));

const SOURCES=[
 "https://raw.githubusercontent.com/dopramo/streams/refs/heads/main/manualstreams.m3u"
];

app.get("/api/channels", async (req,res)=>{
  const map={};

  for(const url of SOURCES){
    try {
      const channels = await parseM3UAll(url);
      for (const ch of channels) {
        const matched = matchChannel(ch.name);
        if (!matched || !ALLOWED_M3U_CHANNELS.includes(matched)) continue;
        
        if (!map[matched]) map[matched] = { logo: null, streams: [] };
        map[matched].streams.push(ch.url);
      }
    } catch(err) {
      console.error("Error parsing M3U:", err.message);
    }
  }

  const result = [];
  for (const name in map) {
    const logo = getLogo(name) || map[name].logo;
    const order = getChannelOrder(name);
    result.push({ name, logo, streams: map[name].streams, order });
  }
  
  result.sort((a, b) => a.order - b.order);
  res.json(result);
});

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');
  
  try {
    const response = await axios.get(url, {
      responseType: url.includes('.m3u8') ? 'text' : 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': new URL(url).origin + '/',
        'Origin': new URL(url).origin
      },
      timeout: 30000
    });
    
    if (url.includes('.m3u8')) {
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Access-Control-Allow-Origin', '*');
      
      let content = response.data;
      const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
      
      content = content.split('\n').map(line => {
        const originalLine = line;
        line = line.trim();
        
        if (!line || line.startsWith('#')) return originalLine;
        
        if (!line.startsWith('http')) {
          let absoluteUrl;
          try {
            absoluteUrl = new URL(line, url).href;
          } catch (e) {
            return originalLine;
          }
          return `/proxy?url=${encodeURIComponent(absoluteUrl)}`;
        }
        else if (line.startsWith('http')) {
          return `/proxy?url=${encodeURIComponent(line)}`;
        }
        
        return originalLine;
      }).join('\n');
      
      res.send(content);
    } else {
      if (response.headers['content-type']) {
        res.setHeader('Content-Type', response.headers['content-type']);
      } else if (url.includes('.ts')) {
        res.setHeader('Content-Type', 'video/mp2t');
      }
      
      if (response.headers['content-length']) {
        res.setHeader('Content-Length', response.headers['content-length']);
      }
      
      response.data.pipe(res);
    }
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).send('Proxy error');
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend on http://0.0.0.0:${PORT}`));
