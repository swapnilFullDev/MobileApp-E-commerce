if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "/Users/rockpvvishwakarma/.gradle/caches/9.0.0/transforms/63841cb8d3bb3422f47e6b80480c37d9/transformed/hermes-android-0.82.1-release/prefab/modules/hermesvm/libs/android.arm64-v8a/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rockpvvishwakarma/.gradle/caches/9.0.0/transforms/63841cb8d3bb3422f47e6b80480c37d9/transformed/hermes-android-0.82.1-release/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

