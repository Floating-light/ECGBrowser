#pragma once

#define NOMINMAX
#include <string>

#include "filesystem/path.h"

#include "util/image.h"
#include "util/mathutil.h"

struct FrameInfo {
  public:
    Buffer2D<Float3> m_beauty; // Render result 
    Buffer2D<float> m_depth; // depth 
    Buffer2D<Float3> m_normal; 
    Buffer2D<Float3> m_position; // world position of each pixel 
    Buffer2D<float> m_id; // object id of each pixel, -1 if none
    std::vector<Matrix4x4> m_matrix; // m_matrix[i] number i object transform form model coordinate to world coordinate, 
                                     // last 1 world position to screen position, last 2 world position to camera position 
};

class Denoiser {
  public:
    Denoiser();

    void Init(const FrameInfo &frameInfo, const Buffer2D<Float3> &filteredColor);
    void Maintain(const FrameInfo &frameInfo);

    void Reprojection(const FrameInfo &frameInfo);
    void TemporalAccumulation(const Buffer2D<Float3> &curFilteredColor);
    Buffer2D<Float3> Filter(const FrameInfo &frameInfo);

    Buffer2D<Float3> ProcessFrame(const FrameInfo &frameInfo);

  public:
    FrameInfo m_preFrameInfo;
    Buffer2D<Float3> m_accColor;
    Buffer2D<Float3> m_misc;
    Buffer2D<bool> m_valid;
    bool m_useTemportal;

    float m_alpha = 0.2f;
    float m_sigmaPlane = 0.1f;
    float m_sigmaColor = 0.6f;
    float m_sigmaNormal = 0.1f;
    float m_sigmaCoord = 32.0f;
    float m_colorBoxK = 1.0f;
};